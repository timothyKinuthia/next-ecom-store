// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from "next/document";


class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="" content="next ecommerce website" />
                    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
                    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>
                    <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Archivo+Black&display=swap" rel="stylesheet"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript/>
                </body>
            </Html>
        )
    }
};

export default MyDocument;