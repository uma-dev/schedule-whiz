import { useEffect, useState } from "react";
import Card from "./Card";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  const dashBoardPath = "/";
  const myTeamPath = "/my-team";
  const loginPath = "/login";

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === dashBoardPath) {
      setActiveLink("home");
    } else if (pathname === myTeamPath) {
      setActiveLink("myTeam");
    } else {
      setActiveLink("");
    }
  }, [location.pathname]);

  const navigateToDashboard = () => {
    navigate(dashBoardPath);
  };

  const navigateToMyTeam = () => {
    navigate(myTeamPath);
  };

  const navigateToLogin = () => {
    navigate(loginPath);
  };

  return (
    <Card color="black-stone flex flex-col h-full justify-between">
      <div className="flex flex-col gap-16">
        <h1 className="flex flex-col text-2xl text-white">
          Schedule
          <span className="text-yellow-schedulewhiz"> Whiz</span>
        </h1>

        <ul className="flex flex-col gap-9 text-sm">
          <li
            onClick={navigateToDashboard}
            className={`flex gap-1 items-center group ${
              activeLink === "home" ? "text-white" : "text-white/70"
            }`}
          >
            <i className="bx bxs-dashboard bx-xs group-hover:animate-pulse"></i>
            Dashboard
          </li>
          <li
            onClick={navigateToMyTeam}
            className={`flex gap-1 items-center group ${
              activeLink === "myTeam" ? "text-white" : "text-white/70"
            }`}
          >
            <i className="bx bxs-group bx-xs group-hover:animate-pulse"></i>
            My Team
          </li>
        </ul>
      </div>

      <div
        onClick={navigateToLogin}
        className="flex gap-1 items-center text-white/70 text-sm group"
      >
        <i className="bx bxs-log-out bx-xs group-hover:text-yellow-schedulewhiz group-hover:animate-pulse"></i>
        Logout
      </div>
    </Card>
  );
};

export default Navbar;
