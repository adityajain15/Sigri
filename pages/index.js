import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getSortedPortfolio } from "../lib/portfolio";

const PortfolioCard = ({ post }) => {
  return (
    <div className="dib pointer relative mv3 mv0-ns w-100 w-third-ns h5">
      <img
        src={post.image}
        className={`w-100 h-100 ${styles["portfolio-image"]}`}
      />
      <div className={`w-100 h-100 absolute flex top-0 ${styles.overlay}`}>
        <span className={`f3 w-100 flex ${styles.overlaytext}`}>
          {post.title}
        </span>
      </div>
    </div>
  );
};

const Home = ({ portfolio }) => {
  const { posts, categories } = portfolio;
  return (
    <div>
      <Head>
        <title>Sigri - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-100 w-90-ns center">
        {posts.map((post, index) =>
          "link" in post ? (
            <a href={post.link} key={`portfolio-card-${index}`}>
              <PortfolioCard post={post} />
            </a>
          ) : (
            <PortfolioCard key={`portfolio-card-${index}`} post={post} />
          )
        )}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const allPostsData = getSortedPortfolio();
  return {
    props: {
      portfolio: allPostsData,
    },
  };
}

export default Home;
