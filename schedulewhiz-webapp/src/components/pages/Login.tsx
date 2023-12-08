import teamImage from "../../assets/images/team-time.png";
import minimalLogo from "../../assets/images/logo-simple.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dashBoardPath = "/";

  const navigateToDashboard = () => {
    navigate(dashBoardPath);
  };

  const svgCode = `<svg width="695" height="1024" viewBox="0 0 695 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M695 0V1024H75.9997C75.9997 1024 -121.5 206 122 476C365.5 746 695 0 695 0Z" fill="#EBB200"/></svg>`;

  const encodedSvg = btoa(svgCode);

  const svgBackground = {
    background: `url("data:image/svg+xml;base64,${encodedSvg}")`,
    backgroundColor: "black",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center",
    backgroundSize: "contain",
    height: "100vh",
  };

  return (
    <div style={svgBackground} className="flex flex-row gap-2">
      <div className="flex flex-col flex-1 text-white gap-4 items-center justify-center">
        <img src={minimalLogo} className="w-16 h-fit" alt="Logo" />
        <span className="text-3xl">WELCOME</span>
        <form className="max-w-md mx-auto flex flex-col items-stretch w-5/12">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
          </div>
          <button
            type="submit"
            className="text-black bg-yellow-schedulewhiz hover:bg-yellow-600 focus:ring-1 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={navigateToDashboard}
          >
            LOGIN
          </button>
        </form>
      </div>

      <div className="flex flex-1">
        <img
          src={teamImage}
          className="w-96 h-fit relative top-56 left-44"
          alt="Team time"
        />
      </div>
    </div>
  );
};

export default Login;
