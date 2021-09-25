import 'sanitize.css';
import 'styles/globals.scss';
import 'katex/dist/katex.css';
import { AppProps } from 'next/app';
import Layout from '@components/layput';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
