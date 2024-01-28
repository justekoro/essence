import "../styles/globals.css";
import { AppProps } from "next/app";
import { ThemeProvider } from "@/components/ThemeProvider";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

function Index({ Component, pageProps }: AppProps) {

  return (
    <App Component={Component} {...pageProps} />
  );
}

export default Index;
