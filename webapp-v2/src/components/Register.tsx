import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import {
  IoCheckmark,
  IoEye,
  IoEyeOff,
  IoInformationCircleOutline,
} from "react-icons/io5";
import GradientDiv from "./GradientDiv";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import axios from "../api/axios";

const NAMES_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)?$/;
const SURNAMES_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)?$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/auth/register";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [names, setNames] = useState("");
  const [validNames, setValidNames] = useState(false);
  const [namesFocus, setNamesFocus] = useState(false);

  const [firstSurname, setFirstSurname] = useState("");
  const [validFirstSurname, setValidFirstSurname] = useState(false);
  const [firstSurnameFocus, setFirstSurnameFocus] = useState(false);

  const [secondSurname, setSecondSurname] = useState("");
  const [validSecondSurname, setValidSecondSurname] = useState(false);
  const [secondSurnameFocus, setSecondSurnameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidNames(NAMES_REGEX.test(names));
  }, [names]);

  useEffect(() => {
    setValidFirstSurname(SURNAMES_REGEX.test(firstSurname));
  }, [firstSurname]);

  useEffect(() => {
    setValidSecondSurname(SURNAMES_REGEX.test(secondSurname));
  }, [secondSurname]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // if button enabled with JS hack
    const emailValidation = EMAIL_REGEX.test(email);
    const namesValidation = NAMES_REGEX.test(names);
    const firstSurnameValidation = SURNAMES_REGEX.test(firstSurname);
    const secondSurnameValidation = SURNAMES_REGEX.test(secondSurname);
    const pwdValidation = PWD_REGEX.test(pwd);

    if (
      !emailValidation ||
      !namesValidation ||
      !firstSurnameValidation ||
      !secondSurnameValidation ||
      !pwdValidation
    ) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          email,
          names,
          firstSurname,
          secondSurname,
          password: pwd,
          role: "USER",
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log(response.data);
      //clear state and controlled inputs fields
      setEmail("");
      setNames("");
      setFirstSurname("");
      setSecondSurname("");
      setPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server response");
      } else if (err.response?.status === 403) {
        setErrMsg("Email taken");
      } else {
        setErrMsg("Register failed");
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
        <Flex minH={"85vh"} height="auto" align={"center"} justify={"center"}>
          <Stack spacing={6} mx={"auto"} maxW={"lg"} p={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Sign up
              </Heading>
              <Text fontSize={"lg"} color={"gray.400"}>
                schedulewhiz webapp
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
                <FormControl id="floating_names" isRequired>
                  <FormLabel
                    display="flex"
                    flexDirection="row"
                    htmlFor="floating_names"
                    gap={2}
                  >
                    Name/s
                    {validNames && <IoCheckmark />}
                  </FormLabel>
                  <Input
                    type="text"
                    name="floating_names"
                    id="floating_names"
                    placeholder=" "
                    required
                    autoComplete="off"
                    // ref={userRef}
                    onChange={(e) => setNames(e.target.value)}
                    aria-invalid={validNames ? "false" : "true"}
                    aria-describedby="namesnote"
                    onFocus={() => setNamesFocus(true)}
                    onBlur={() => setNamesFocus(false)}
                  />

                  {namesFocus && !validNames && (
                    <FormLabel
                      id="namesnote"
                      display="flex"
                      flexDirection="row"
                      gap={2}
                      justifyContent="start"
                      alignItems="center"
                      pt={2}
                      color="red.700"
                      fontSize={14}
                    >
                      <IoInformationCircleOutline />
                      Must be a valid name. Enter up to two names.
                    </FormLabel>
                  )}
                </FormControl>

                <HStack>
                  <Box>
                    <FormControl id="floating_first_surname" isRequired>
                      <FormLabel
                        display="flex"
                        flexDirection="row"
                        htmlFor="floating_first_surname"
                        gap={2}
                      >
                        First Surname
                        {validFirstSurname && <IoCheckmark />}
                      </FormLabel>
                      <Input
                        type="text"
                        name="floating_first_surname"
                        id="floating_first_surname"
                        placeholder=" "
                        required
                        autoComplete="off"
                        // ref={userRef}
                        onChange={(e) => setFirstSurname(e.target.value)}
                        aria-invalid={validFirstSurname ? "false" : "true"}
                        aria-describedby="surnamesnote"
                        onFocus={() => setFirstSurnameFocus(true)}
                        onBlur={() => setFirstSurnameFocus(false)}
                      />
                    </FormControl>
                  </Box>

                  <Box>
                    <FormControl id="floating_second_surname" isRequired>
                      <FormLabel
                        display="flex"
                        flexDirection="row"
                        htmlFor="floating_second_surname"
                        gap={2}
                      >
                        Last Surname
                      </FormLabel>
                      <Input
                        type="text"
                        name="floating_second_surname"
                        id="floating_second_surname"
                        placeholder=" "
                        required
                        autoComplete="off"
                        // ref={userRef}
                        onChange={(e) => setSecondSurname(e.target.value)}
                        aria-invalid={validSecondSurname ? "false" : "true"}
                        aria-describedby="surnamesnote"
                        onFocus={() => setSecondSurnameFocus(true)}
                        onBlur={() => setSecondSurnameFocus(false)}
                      />
                    </FormControl>
                  </Box>
                </HStack>

                {(firstSurnameFocus || secondSurnameFocus) &&
                  (!validFirstSurname || !validSecondSurname) && (
                    <FormLabel
                      id="surnamesnote"
                      display="flex"
                      flexDirection="row"
                      gap={2}
                      justifyContent="start"
                      alignItems="center"
                      color="red.700"
                      fontSize={14}
                    >
                      <IoInformationCircleOutline />
                      Must be a valid surname.
                    </FormLabel>
                  )}

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
                    id="floating_email"
                    placeholder=" "
                    required
                    autoComplete="off"
                    ref={userRef}
                    onChange={(e) => setEmail(e.target.value)}
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
                      pt={2}
                      fontSize={14}
                    >
                      <IoInformationCircleOutline />
                      Must be a valid email address
                    </FormLabel>
                  )}
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel
                    display="flex"
                    flexDirection="row"
                    htmlFor="floating_password"
                    gap={2}
                  >
                    Password
                    {validPwd && <IoCheckmark />}
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
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
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        size="xl"
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <IoEye /> : <IoEyeOff />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

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

                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    onClick={handleRegister}
                    background="yellow"
                    isDisabled={
                      !validEmail ||
                      !validPwd ||
                      !validFirstSurname ||
                      !validSecondSurname
                        ? true
                        : false
                    }
                  >
                    Register
                  </Button>
                </Stack>
                <Stack pt={4}>
                  <Text fontSize="small" align={"center"}>
                    Already a user?{" "}
                    <Link
                      color={"cornflowerblue"}
                      onClick={() => navigate("/login")}
                    >
                      Login
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

export default Register;
