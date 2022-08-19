import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { RecoilRoot, useRecoilValue } from "recoil";
import themeAtom from "../atom/mode";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/material";

const Index = ({ Component, pageProps }) => {
  const themeValue = useRecoilValue(themeAtom);

  const theme = createTheme({
    palette: {
      mode: themeValue ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <RecoilRoot>
        <Index Component={Component} pageProps={pageProps} />
      </RecoilRoot>
    </StyledEngineProvider>
  );
}

export default MyApp;
