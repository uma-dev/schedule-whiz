import { Box, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router";

function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      gap={6}
    >
      <Heading size="2xl">You are unauthorized!</Heading>
      <Button onClick={goBack}>Go back</Button>
    </Box>
  );
}

export default Unauthorized;
