import React from "react";
import { getPostIDs, getPostData } from "../../lib/posts";
import Date from "../../components/Date";
import dynamic from "next/dynamic";
import { MDXRemote } from "next-mdx-remote";

const Summary = dynamic(() => import("../../components/Summary"));

const defaultComponents = {};

const Post = ({ source, frontMatter, componentNames }) => {
  const { title, date } = frontMatter;
  const components = {
    ...defaultComponents,
    Summary: componentNames.includes("Summary") ? Summary : null,
  };
  return (
    <div className="w-100 w-80-ns center">
      <h1 className="f2 lh-title">{title}</h1>
      <span className="f4 silver">
        Published: <Date dateString={date} />
      </span>
      <article className="baskerville f4 lh-copy mv2">
        <MDXRemote {...source} components={components} />
      </article>
    </div>
  );
};

export async function getStaticProps({ params }) {
  return await getPostData(params.id);
}

export async function getStaticPaths() {
  return {
    paths: getPostIDs(),
    fallback: false,
  };
}

export default Post;
