import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const portfolioDirectory = path.join(process.cwd(), "portfolio");

export async function getPostData(fileName) {
  const fullPath = path.join(postsDirectory, `${fileName}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return { fileName, contentHtml, ...matterResult.data };
}

export function getSortedPortfolio() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(portfolioDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(portfolioDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  const allCategories = Array.from(
    new Set(
      allPostsData.map((post) => post.tags || []).reduce((a, b) => [...a, ...b])
    )
  );

  allPostsData.sort((a, b) => {
    if (a.feature && !b.feature) {
      return -1;
    } else if (b.feature && !a.feature) {
      return 1;
    } else if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return {
    posts: allPostsData,
    categories: allCategories,
  };
}

export function getPostIDs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return { params: { id: fileName.replace(/\.md$/, "") } };
  });
}
