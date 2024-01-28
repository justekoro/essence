import "../styles/globals.css";
import { AppProps } from "next/app";
import { ThemeProvider } from "@/components/ThemeProvider";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class"
      enableSystem
      defaultTheme="system">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

function Index({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Essence Tracker</title>
        <meta name="description" content="Cherche l'essence la moins chère dans toute la France." />
      </Head>
      <App Component={Component} {...pageProps} />
    </>
  );
}

export default Index;
