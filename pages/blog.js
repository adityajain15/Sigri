import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getSortedPostsData } from "../lib/posts";
import PostList from "../components/PostList";

const Blog = ({ postData }) => {
  const { posts, categories } = postData;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const router = useRouter();
  const { query } = router;
  useEffect(() => {
    if ("categories" in query) {
      const queryCategories = query.categories
        .split(",")
        .filter((queryCategory) => categories.includes(queryCategory));
      setSelectedCategories(queryCategories);
    }
  }, [query]);
  return (
    <div className="w-100 w-90-ns center f4 lh-solid">
      <Head>
        <title>Sigri - Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="measure tc center mb4">
        <span className="tc dib">Filter by tags:</span>
        <ul className="w-100 dib">
          {categories.map((category, index) => (
            <button
              key={`cat-${index}`}
              className={`dib ma2 pa1 ${
                selectedCategories.includes(category) ? "active" : ""
              }`}
              onClick={() => {
                if (selectedCategories.includes(category)) {
                  setSelectedCategories(
                    selectedCategories.filter((d) => d !== category)
                  );
                } else {
                  setSelectedCategories([...selectedCategories, category]);
                }
              }}
            >
              {category}
            </button>
          ))}
        </ul>
      </div>
      <PostList posts={posts} categories={selectedCategories} />
    </div>
  );
};

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      postData: allPostsData,
    },
  };
}

export default Blog;
