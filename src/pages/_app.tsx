import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {
          // Primary Meta Tags
        }
        <title>Starlight Ban history</title>

        <meta name="title" content="Starlight Ban history" />
        <meta name="description" content="Ban history Starlight community." />

        {
          // Open Graph / Facebook
        }
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beast-bans.pages.dev/" />
        <meta property="og:title" content="Starlight Banning history" />
        <meta
          property="og:description"
          content="Ban history on the Garry's Mod server in the Starlight community."
        />
        <meta
          property="og:image"
          content="https://beast-bans.pages.dev/starlight-logo.png"
        />

        {
          // Twitter
        }
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://beast-bans.pages.dev/" />
        <meta property="twitter:title" content="Starlight Banning history" />
        <meta
          property="twitter:description"
          content="Ban history on the Garry's Mod server in the Starlight community."
        />
        <meta
          property="twitter:image"
          content="https://beast-bans.pages.dev/starlight-logo.png"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
