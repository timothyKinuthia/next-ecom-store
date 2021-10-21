/* eslint-disable @next/next/no-sync-scripts */
// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="" content="next ecommerce website" />
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Archivo+Black&display=swap"
            rel="stylesheet"
          ></link>
          <script
            src={`https://www.paypal.com/sdk/js?client-id=ARqchgJPAtkJhx7_CZG_AvKcsG5fZYk1YMWezT6Vt5u_7IrHLnCW4mTlFF9UEI9oLyvOGvaRKA7QPWeA`}
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
