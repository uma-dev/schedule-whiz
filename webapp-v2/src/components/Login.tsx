import { useNavigate } from "react-router";
import GradientDiv from "./GradientDiv";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";

function Login() {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <GradientDiv color={colorMode}>
      <Flex minH={"85vh"} align={"center"} justify={"center"}>
        <Stack spacing={6} mx={"auto"} minW={"sm"} maxW={"lg"} p={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign="center">
              Sign in
            </Heading>
            <Text fontSize={"lg"} color={"gray.400"}>
              to your account
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  {/* <Text color="cornflowerblue">Forgot password?</Text> */}
                </Stack>
                <Button onClick={handleLogin} background="yellow">
                  Login
                </Button>
              </Stack>
              <Stack pt={4}>
                <Text fontSize="small" align={"center"}>
                  Need an account?{" "}
                  <Link
                    color={"cornflowerblue"}
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </GradientDiv>
  );
}

export default Login;
