import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Roboto, sans-serif", // Change the font family for headings
    body: "Roboto, sans-serif", // Change the font family for headings
  },
  fontWeights: {
    bold: 700, // Custom font weight for bold text
  },
  components: {
    Heading: {
      variants: {
        "section-title": {
          marginTop: 3,
          display: { base: "none", md: "block" },
        },
      },
    },
  },

  colors: {
    blue: "#0C356A",
    yellow: "#EBB200",
    backgroundLight: "#F9F9FC",
    backgroundDark: "#222222",
    surfaceDark: "#1D1D1D",
  },
});

export default theme;
