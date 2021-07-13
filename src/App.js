import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Switch from "@material-ui/core/Switch";
import { theme } from "./components/theme";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@material-ui/core/colors";
import DashboardMain from "./components/DashboardMain";
import Main from "./components/Main";

const App = () => {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });
  const lightTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: "#4dabf5",
      },
      secondary: {
        main: "#f73378",
      },
    },
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <ChakraProvider theme={theme}>
      {/* <ThemeProvider theme={lightTheme}> */}
      <CssBaseline />
      <div>
        <React.Suspense fallback={<h1>Loading profile...</h1>}>
          {/* <DashboardMain /> */}
          <Main />
        </React.Suspense>
      </div>
      {/* <Switch checked={darkState} onChange={handleThemeChange} /> */}

      {/* </ThemeProvider> */}
    </ChakraProvider>
  );
};

export default App;
