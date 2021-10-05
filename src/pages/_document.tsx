import Document, { Html, Head, Main, NextScript } from 'next/document';

interface DocumentInterface {
  url: string;
  title: string;
  description: string;
}

class MyDocument extends Document implements DocumentInterface {
  url = 'https://esh2n.dev';
  title = 'esh2n.dev';
  description = "esh2n's tech blog";
  imgWidth = 1200;
  imgHeight = 630;

  render(): JSX.Element {
    return (
      <Html lang="ja-JP">
        <Head>
          <meta name="description" content={this.description} />
          <meta name="theme-color" content="#333" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={this.title} />
          <meta property="og:url" content={this.url} />
          <meta property="og:description" content={this.description} />
          <meta property="og:site_name" content={this.title} />
          <meta property="og:image" content={`${this.url}/images/og.png`} />
          <meta name="twitter:image" content={`${this.url}/images/og.png`} />
          <meta property="og:image:width" content={String(this.imgWidth)} />
          <meta property="og:image:height" content={String(this.imgHeight)} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="format-detection" content="telephone=no" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <>
          <Main />
          <NextScript />
        </>
      </Html>
    );
  }
}

export default MyDocument;
