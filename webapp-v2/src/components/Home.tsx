import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <Hero />
      <Footer />
    </Box>
  );
};

export default Home;
