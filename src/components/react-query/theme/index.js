import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "blue.800",
        backgroundColor: "blue.100",
      },
    },
  },
  fonts: {
    body: "Lato, sans-serif",
    heading: "Forum, sans-serif",
    mono: "Menlo, monospace",
  },
  colors: {
    blue: {
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
  // withDefaultColorScheme({ colorScheme: "brand" }),
});
