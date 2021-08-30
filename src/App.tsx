import { FC } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { deepPurple, pink } from "@material-ui/core/colors";
import { SnackbarProvider } from "notistack";
import "./App.css";
import Wallet from "./components/Wallet";
import NavigationBar from "./components/NavigationBar";
import Home from "./screens/Home";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: deepPurple[700],
    },
    secondary: {
      main: pink[700],
    },
  },
  overrides: {
    MuiButtonBase: {
      root: {
        justifyContent: "flex-start",
      },
    },
    MuiButton: {
      root: {
        textTransform: undefined,
        padding: "12px 16px",
      },
      startIcon: {
        marginRight: 8,
      },
      endIcon: {
        marginLeft: 8,
      },
    },
  },
});

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Wallet>
          <NavigationBar />
          <Home />
        </Wallet>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
