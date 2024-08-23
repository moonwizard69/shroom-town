import Nprogress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';

import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => Nprogress.start());

// We use this to control things higher than our page component
export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
