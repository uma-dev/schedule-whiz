import { extendTheme } from "@chakra-ui/react";
import { color } from "framer-motion";

const theme = extendTheme({
  fonts: {
    heading: "Montserrat, sans-serif", // Change the font family for headings
  },
  fontWeights: {
    bold: 700, // Custom font weight for bold text
  },
  components: {
    Heading: {
      variants: {
        "section-title": {
          marginTop: 3,
        },
      },
    },
  },
});

export default theme;
