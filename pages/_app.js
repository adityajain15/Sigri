import React from "react";
import "../styles/globals.css";
import BaseLayout from "../layouts/BaseLayout";
import "tachyons";
import "reset-css";

function MyApp({ Component, pageProps }) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
}

export default MyApp;
