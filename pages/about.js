import React from "react";
import Head from "next/head";
import { getAbout } from "../lib/content";

const About = ({ content }) => {
  const { contentHtml, social } = content;
  return (
    <div className="measure center">
      <Head>
        <title>Sigri - About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article
        className="baskerville lh-copy f4"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      <div className="f4 lh-copy">
        You can also find me on:
        {social.map((s, index) => (
          <a key={`social-${index}`} className="deeppink db f5" href={s[1]}>
            {s[0]}
          </a>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      content: await getAbout(),
    },
  };
}

export default About;
