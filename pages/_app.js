import { Fragment } from "react";
import Head from "next/head";
import "./app.scss";

const App = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Head>
        <title>Reaktor Assignment</title>
      </Head>
      <div className="main">
        <Component {...pageProps} />
      </div>
    </Fragment>
  );
};

export default App;
