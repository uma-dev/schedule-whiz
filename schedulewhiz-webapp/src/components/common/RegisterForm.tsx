import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { registerUser } from "../../services/registerUser";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAMES_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)?$/;
const SURNAMES_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)?$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = /^.*$/;

const RegisterForm = () => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [names, setNames] = useState("");
  const [validNames, setValidNames] = useState(false);
  const [namesFocus, setNamesFocus] = useState(false);

  const [firstSurname, setFirstSurname] = useState("");
  const [validFirstSurname, setValidFirstSurname] = useState(false);
  const [firstSurnameFocus, setFirstSurnameFocus] = useState(false);

  const [secondSurname, setSecondSurname] = useState("");
  const [validSecondSurname, setValidSecondSurname] = useState(false);
  const [secondSurnameFocus, setSecondSurnameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
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
      const response = await registerUser(
        email,
        names,
        firstSurname,
        secondSurname,
        pwd,
      );
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setEmail("");
      setNames("");
      setFirstSurname("");
      setSecondSurname("");
      setPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email taken");
      } else {
        setErrMsg("Register failed");
      }
      errRef.current?.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <span className="text-3xl">JOIN US</span>
          <form
            className="max-w-md mx-auto flex flex-col items-stretch w-5/12"
            onSubmit={handleSubmit}
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_email"
                id="floating_email"
                placeholder=" "
                required
                autoComplete="off"
                ref={userRef}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer"
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
                <FontAwesomeIcon
                  icon={faCheck}
                  className={
                    validEmail ? "visible text-green-200 ml-2" : "hidden"
                  }
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validEmail || !email
                      ? "hidden"
                      : "visible text-red-400 ml-2"
                  }
                />
              </label>
              <p
                id="uidnote"
                className={
                  emailFocus && email && !validEmail
                    ? "visible text-xs"
                    : "hidden"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                Must be a valid email address
                <br />
              </p>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_names"
                id="floating_names"
                placeholder=" "
                required
                autoComplete="off"
                ref={userRef}
                onChange={(e) => setNames(e.target.value)}
                value={names}
                aria-invalid={validNames ? "false" : "true"}
                aria-describedby="namesnote"
                onFocus={() => setNamesFocus(true)}
                onBlur={() => setNamesFocus(false)}
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer"
              />
              <label
                htmlFor="floating_names"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Names
                <FontAwesomeIcon
                  icon={faCheck}
                  className={
                    validNames ? "visible text-green-200 ml-2" : "hidden"
                  }
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validNames || !names
                      ? "hidden"
                      : "visible text-red-400 ml-2"
                  }
                />
              </label>
              <p
                id="namesnote"
                className={
                  namesFocus && names && !validNames
                    ? "visible text-xs"
                    : "hidden"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                Must be a valid name.
                <br />
                Enter up to two names
              </p>
            </div>

            <div className="relative z-0 w-full mb-5 group flex flex-row gap-1">
              <input
                type="text"
                name="floating_firstSurname"
                id="floating_firstSurname"
                placeholder=" "
                required
                autoComplete="off"
                ref={userRef}
                onChange={(e) => setFirstSurname(e.target.value)}
                value={firstSurname}
                aria-invalid={validFirstSurname ? "false" : "true"}
                aria-describedby="surnamenote"
                onFocus={() => setFirstSurnameFocus(true)}
                onBlur={() => setFirstSurnameFocus(false)}
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer"
              />
              <label
                htmlFor="floating_firstSurname"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                1st Surname
                <FontAwesomeIcon
                  icon={faCheck}
                  className={
                    validFirstSurname ? "visible text-green-200 ml-2" : "hidden"
                  }
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validFirstSurname || !firstSurname
                      ? "hidden"
                      : "visible text-red-400 ml-2"
                  }
                />
              </label>

              <input
                type="text"
                name="floating_secondSurname"
                id="floating_secondSurname"
                placeholder=" "
                required
                autoComplete="off"
                ref={userRef}
                onChange={(e) => setSecondSurname(e.target.value)}
                value={secondSurname}
                aria-invalid={validSecondSurname ? "false" : "true"}
                aria-describedby="surnamenote"
                onFocus={() => setSecondSurnameFocus(true)}
                onBlur={() => setSecondSurnameFocus(false)}
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer"
              />
              <label
                htmlFor="floating_secondSurname"
                className="peer-focus:font-medium absolute left-1/2 text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-1/2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                2nd Surname
                <FontAwesomeIcon
                  icon={faCheck}
                  className={
                    validSecondSurname
                      ? "visible text-green-200 ml-2"
                      : "hidden"
                  }
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validSecondSurname || !secondSurname
                      ? "hidden"
                      : "visible text-red-400 ml-2"
                  }
                />
              </label>
            </div>
            <div className="mb-4">
              <p
                id="surnamenote"
                className={
                  (firstSurnameFocus && firstSurname && !validFirstSurname) ||
                  (secondSurnameFocus && secondSurname && !validSecondSurname)
                    ? "visible text-xs"
                    : "hidden"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                Ensure that both surname are valid.
                <br />
                Special characters, spaces at the end and numbers are not
                allowed.
              </p>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer"
                placeholder=" "
                required
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
                <FontAwesomeIcon
                  icon={faCheck}
                  className={
                    validPwd ? "visible text-green-200 ml-2" : "hidden"
                  }
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validPwd || !pwd ? "hidden" : "visible text-red-400 ml-2"
                  }
                />
              </label>
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "visible text-xs" : "hidden"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            </div>

            <button
              className="text-black bg-yellow-schedulewhiz hover:bg-yellow-600 focus:ring-1 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              disabled={!validEmail || !validPwd ? true : false}
            >
              REGISTER
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default RegisterForm;
