import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postAuth } from "../../services/postAuth";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const LoginForm = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidName(EMAIL_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if button enabled with JS hack
    const emailValidation = EMAIL_REGEX.test(user);
    const pwdValidation = PWD_REGEX.test(pwd);

    if (!emailValidation || !pwdValidation) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await postAuth(user, pwd);
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      const accessToken = response?.access_token;
      setAuth(user, pwd, accessToken);
      setUser("");
      setPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server response");
      } // TODO add conditionals for specific error codes
      else {
        setErrMsg("Incorrect email or password");
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
            className={errMsg ? "errmsg text-red-300" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <span className="text-3xl">WELCOME</span>
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
                onChange={(e) => setUser(e.target.value)}
                value={user}
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer"
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
                <FontAwesomeIcon
                  icon={faCheck}
                  className={
                    validName ? "visible text-green-200 ml-2" : "hidden"
                  }
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validName || !user ? "hidden" : "visible text-red-400 ml-2"
                  }
                />
              </label>
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "visible text-xs" : "hidden"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                Must be a valid email address
                <br />
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
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
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
              disabled={!validName || !validPwd ? true : false}
            >
              LOGIN
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default LoginForm;
