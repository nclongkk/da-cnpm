import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "redux/store";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@material-ui/core";
const theme = createTheme({
  typography: {
    fontFamily: ["Noto Sans JP", "sans-serif"].join(","),
    button: {
      fontSize: "1rem",
      textTransform: "capitalize",
    },
  },
});
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <SnackbarProvider>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </SnackbarProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);
