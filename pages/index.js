import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getSortedPortfolio } from "../lib/portfolio";

const Home = ({ portfolio }) => {
  const { posts, categories } = portfolio;
  console.log(posts.map((post) => "link" in post));
  return (
    <div>
      <Head>
        <title>Sigri - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-90 center">
        {posts.map((post, index) =>
          "link" in post ? (
            <a
              href={post.link}
              className={`dib pointer relative center w-third h5`}
            >
              <Image
                layout="fill"
                objectFit="cover"
                src={post.image}
                className={styles["portfolio-image"]}
              />
              <div
                className={`w-100 h-100 absolute pa2 flex ${styles.overlay}`}
              >
                <span className={`f3 w-100 flex ${styles.overlaytext}`}>
                  {post.title}
                </span>
              </div>
            </a>
          ) : (
            <div className={`dib relative center w-third h5`}>
              <Image
                layout="fill"
                objectFit="cover"
                src={post.image}
                className={styles["portfolio-image"]}
              />
              <div
                className={`w-100 h-100 absolute pa2 flex ${styles.overlay}`}
              >
                <span className={`f3 w-100 flex ${styles.overlaytext}`}>
                  {post.title}
                </span>
              </div>
            </div>
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
