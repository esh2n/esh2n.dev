import React, { useEffect } from 'react';
import { LitElement, html } from 'lit';
import { NextPage } from 'next';
import Head from 'next/head';

const App = () => {
  useEffect(() => {
    import('@material/mwc-button');
    import('@okra-ui/gradient-text');
  }, []);
  const onClick = (e) => {
    alert('clicked');
  };
  return (
    <div className="sa">
      <mwc-button raised onClick={onClick}>
        Click Here!
      </mwc-button>
      <gradient-text text="Hello okra-ui" />
    </div>
  );
};

const Sasa: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </div>
  );
};

export default Sasa;