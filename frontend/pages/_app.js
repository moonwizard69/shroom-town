import Page from '../components/Page';
// We use this to control things higher than our page component
export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
