import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Navbar />
      <Hero />
      <Footer />
    </Box>
  );
};

export default Home;
