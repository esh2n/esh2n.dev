import { ThemeProvider } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Header from '@components/header';
import styled from '@emotion/styled';
import Footer from './footer';

interface Props {
  title?: string;
}

const DisplayedPage = styled.div`
  min-height: 100vh;
}
`;

const Layout: React.FC<Props> = ({ children }) => {
  const { pathname, query } = useRouter();
  const handlePath = (path: string) => {
    switch (path) {
      case '/':
        return 'Home';
      case '/posts':
        return 'Blog';
      case '/notion':
        return 'Notion';
      default:
        return '404';
    }
  };

  return (
    <>
      <Head>
        <title>{handlePath(pathname) + ' | esh2n.dev'}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <DisplayedPage>
        <>{children}</>
      </DisplayedPage>
      <Footer />
    </>
  );
};

export default Layout;
