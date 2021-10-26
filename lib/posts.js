import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const postsDirectory = path.join(process.cwd(), "blog");

export async function getPostData(fileName) {
  const fullPath = path.join(postsDirectory, `${fileName}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  const componentNames = [/<Summary/.test(content) ? "Summary" : null].filter(
    Boolean
  );
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      filename: fileName,
      source: mdxSource,
      frontMatter: data,
      componentNames,
    },
  };
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.mdx$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const { content, data } = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...data,
    };
  });
  const allCategories = Array.from(
    new Set(
      allPostsData.map((post) => post.tags || []).reduce((a, b) => [...a, ...b])
    )
  );
  // Sort posts by date
  return {
    posts: allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    }),
    categories: allCategories,
  };
}

export function getPostIDs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return { params: { id: fileName.replace(/\.mdx$/, "") } };
  });
}
