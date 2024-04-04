import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/auth/useAuth";
import axios from "../../api/axios";
import GradientDiv from "../layouts/GradientDiv";

const LOGIN_URL = "/api/auth/authenticate";

function Login() {
  const { colorMode } = useColorMode();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const emailRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleLogin = async (e: React.FormEvent) => {
    // if button enabled with JS hack
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      // Store access and refresh token and roles
      const accessToken = response?.data?.access_token;
      const refreshToken = response?.data?.refresh_token;
      const userRole = response?.data?.role;
      setAuth({ email, pwd, userRole, accessToken, refreshToken });
      // Post a record every login
      // Clear inputs and go to the path which user came from
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server response");
      } // TODO: add conditionals for specific error codes
      else {
        setErrMsg("Incorrect email or password");
      }
      errRef.current?.focus();
    }
  };

  return (
    <GradientDiv color={colorMode}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Flex minH={"85vh"} align={"center"} justify={"center"}>
          <Stack
            spacing={6}
            mx={"auto"}
            minW={{ base: "sm", md: "md" }}
            maxW={"lg"}
            p={6}
          >
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
              {errMsg && (
                <Text
                  ref={errRef}
                  aria-live="assertive"
                  textAlign="center"
                  color="red.700"
                  pb={4}
                >
                  {errMsg}
                </Text>
              )}
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel
                    display="flex"
                    flexDirection="row"
                    htmlFor="floating_email"
                    gap={2}
                  >
                    Email address
                  </FormLabel>
                  <Input
                    type="email"
                    id="floating_email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </FormControl>

                <FormControl id="password">
                  <FormLabel
                    display="flex"
                    flexDirection="row"
                    htmlFor="floating_password"
                    gap={2}
                  >
                    Password
                  </FormLabel>
                  <Input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                  />
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
                  <Button
                    onClick={handleLogin}
                    background="yellow"
                    isDisabled={!email || !pwd ? true : false}
                  >
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
      </motion.div>
    </GradientDiv>
  );
}

export default Login;
