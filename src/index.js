import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { RecoilRoot, useRecoilValue } from "recoil";
import themeAtom from "./atom/mode";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/material";

const Index = () => {
  const themeValue = useRecoilValue(themeAtom);

  const theme = createTheme({
    palette: {
      mode: themeValue? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RecoilRoot>
        <Index />
      </RecoilRoot>
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
