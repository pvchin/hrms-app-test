import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

// const config = {
//   initialColorMode: "light",
//   useSystemColorMode: false,
// };

//export const theme = extendTheme({ config });

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "olive.800",
        backgroundColor: "olive.100",
        lightbackgroundColor: "olive.50"
      },
    },
  },
  fonts: {
    body: "Lato, sans-serif",
    heading: "Forum, sans-serif",
    mono: "Menlo, monospace",
  },
  colors: {
    olive: {
      50: "#ebf8ff",
      100: "#bee3f8",
      200: "#90cdf4",
      300: "#63b3ed",
      400: "#4299e1",
      500: "#3182ce",
      600: "#2b6cb0",
      700: "#2c5282",
      800: "#2a4365",
      900: "#1a365d",
    },
  },
  //withDefaultColorScheme({ colorScheme: "brand" }),
});
