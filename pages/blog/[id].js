import React from "react";
import { getPostIDs, getPostData } from "../../lib/posts";
import Date from "../../components/Date";

const Post = ({ post }) => {
  const { contentHtml, title, date } = post;
  return (
    <div className="w-80 center">
      <h1 className="f2 lh-title">{title}</h1>
      <span className="f4 silver">
        Published: <Date dateString={date} />
      </span>
      <article
        className="baskerville f4 lh-copy"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
};

export async function getStaticProps({ params }) {
  return {
    props: {
      post: await getPostData(params.id),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: getPostIDs(),
    fallback: false,
  };
}

export default Post;
