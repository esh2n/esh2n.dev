import 'sanitize.css';
import '@styles/globals.scss';
import 'katex/dist/katex.css';
import { AppProps } from 'next/app';
import Layout from '@components/layout';
import { RecoilRoot } from 'recoil';

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default App;
