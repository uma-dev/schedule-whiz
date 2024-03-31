import { useLocation, useNavigate } from "react-router";
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
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { IoCheckmark, IoInformationCircleOutline } from "react-icons/io5";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Login() {
  const { colorMode } = useColorMode();
  // const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleLogin = async (e: React.FormEvent) => {
    // if button enabled with JS hack
    e.preventDefault();
    const emailValidation = EMAIL_REGEX.test(email);
    const pwdValidation = PWD_REGEX.test(pwd);

    if (!emailValidation || !pwdValidation) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      // Get access token
      const accessToken = "accessToken";
      const refreshToken = "accessToken";
      // Set user email and access token to authorize
      // login(accessToken, refreshToken, userEmail);
      // Post a record every login, backend will validate hour and only one record each day
      // Go to the path which user came from
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
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
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel
                    display="flex"
                    flexDirection="row"
                    htmlFor="floating_email"
                    gap={2}
                  >
                    Email address
                    {validEmail && <IoCheckmark />}
                  </FormLabel>
                  <Input
                    type="email"
                    name="floating_email"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />

                  {emailFocus && email && !validEmail && (
                    <FormLabel
                      id="uidnote"
                      display="flex"
                      flexDirection="row"
                      gap={2}
                      justifyContent="start"
                      alignItems="center"
                      py={1}
                      color="red.700"
                      fontSize={14}
                    >
                      <IoInformationCircleOutline />
                      Must be a valid email address
                    </FormLabel>
                  )}
                </FormControl>

                <FormControl id="password">
                  <FormLabel
                    display="flex"
                    flexDirection="row"
                    htmlFor="floating_password"
                    gap={2}
                  >
                    Password
                    {validPwd && <IoCheckmark />}
                  </FormLabel>
                  <Input
                    type="password"
                    name="floating_password"
                    id="password"
                    placeholder=" "
                    required
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  {pwdFocus && !validPwd && (
                    <FormLabel
                      id="pwdnote"
                      display="flex"
                      flexDirection="row"
                      gap={2}
                      justifyContent="center"
                      alignItems="start"
                      py={1}
                      color="red.700"
                      fontSize={14}
                      maxWidth="xs"
                      pb={0}
                    >
                      <IoInformationCircleOutline size={28} />
                      <Text>
                        Must include upper and lower case letters, a number and
                        a special character.
                      </Text>
                    </FormLabel>
                  )}
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
      </motion.div>
    </GradientDiv>
  );
}

export default Login;
