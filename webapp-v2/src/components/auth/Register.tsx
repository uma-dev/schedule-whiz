import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import {
  IoCheckmark,
  IoEye,
  IoEyeOff,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../hooks/auth/useAuth";
import axios from "../../api/axios";
import GradientDiv from "../layouts/GradientDiv";

const NAMES_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)?$/;
const SURNAMES_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)?$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/auth/register";

const ErrorMessage = ({ message }) => {
  return (
    <FormLabel
      id="announcement"
      display="flex"
      flexDirection="row"
      gap={2}
      justifyContent="start"
      alignItems="center"
      pt={2}
      color="red.700"
      fontSize={14}
      maxWidth="xs"
    >
      <IoInformationCircleOutline />
      {message}
    </FormLabel>
  );
};

function Register() {
  const { colorMode } = useColorMode();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const emailRef = useRef<HTMLInputElement | null>(null);
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
  const [showPassword, setShowPassword] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [role, setRole] = useState("");
  const [roleSelected, setRoleSelected] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
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

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    // avoid remain true when diselect role
    setRoleSelected(selectedRole !== "");
  };

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
          role: role,
        }),
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
      //clear state and controlled inputs fields
      setEmail("");
      setNames("");
      setFirstSurname("");
      setSecondSurname("");
      setPwd("");
      navigate(from, { replace: true });
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
                    ref={emailRef}
                    onChange={(e) => setNames(e.target.value)}
                    aria-invalid={validNames ? "false" : "true"}
                    aria-describedby="namesnote"
                    onFocus={() => setNamesFocus(true)}
                    onBlur={() => setNamesFocus(false)}
                  />

                  {namesFocus && !validNames && names && (
                    <ErrorMessage message="Must be a valid name. Enter up to two names." />
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
                        {validSecondSurname && <IoCheckmark />}
                      </FormLabel>
                      <Input
                        type="text"
                        name="floating_second_surname"
                        id="floating_second_surname"
                        placeholder=" "
                        required
                        autoComplete="off"
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
                  (!validFirstSurname || !validSecondSurname) &&
                  (firstSurname || secondSurname) && (
                    <ErrorMessage message="Must be valid surnames." />
                  )}

                <FormControl id="floating_email" isRequired>
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
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />

                  {emailFocus && email && !validEmail && (
                    <ErrorMessage message="Must be a valid email address." />
                  )}
                </FormControl>

                <FormControl id="role_select" isRequired>
                  <FormLabel
                    display="flex"
                    flexDirection="row"
                    htmlFor="role_select"
                    gap={2}
                  >
                    Role
                    {roleSelected && <IoCheckmark />}
                  </FormLabel>

                  <Select
                    isRequired
                    placeholder="Select role"
                    name="role_select"
                    onChange={handleRoleChange}
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </Select>

                  {!roleSelected &&
                    validNames &&
                    validFirstSurname &&
                    validSecondSurname &&
                    validEmail && (
                      <ErrorMessage message="Must select a role." />
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
                        type="submit"
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <IoEye /> : <IoEyeOff />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  {pwdFocus && !validPwd && (
                    <ErrorMessage
                      message="8-24 chars: upper and lower case letters, a number and
                        a special character !@#$%."
                    />
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
                      !role ||
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
