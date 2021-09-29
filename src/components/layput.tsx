import { ThemeProvider } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Header from '@components/header';
import PrimarySearchAppBar from '@components/header-mui';
import styled from '@emotion/styled';

interface Props {
  title?: string;
}

const DisplayedPage = styled.div`
  /* width: 80%;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  justify-content: center; */
`;

const Layout: React.FC<Props> = ({ children }) => {
  const { pathname, query } = useRouter();

  return (
    <>
      <Head>
        <title>{pathname === '/' ? 'HOME' : pathname.split('/')[1].toUpperCase()}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <PrimarySearchAppBar />

      <DisplayedPage>
        <>{children}</>
      </DisplayedPage>
    </>
  );
};

export default Layout;
