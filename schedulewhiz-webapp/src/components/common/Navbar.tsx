import { useEffect, useState } from "react";
import Card from "./Card";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  const dashBoardPath = "/";
  const myTeamPath = "/my-team";
  const loginPath = "/login";

 
   useEffect(() => {
        const pathname = location.pathname;
        if (pathname ===  dashBoardPath) {
          setActiveLink('home');
        } else if (pathname === myTeamPath) {
          setActiveLink('myTeam');
        } else {
          setActiveLink('');
        }
   } , [location.pathname]);

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
      <div className="flex flex-col gap-12">
        <h1 className="flex flex-col text-3xl text-white">
          Schedule
          <span className="text-yellow-schedulewhiz"> Whiz</span>
        </h1>

        <ul className="flex flex-col gap-12 text-base">
          <li
            onClick={navigateToDashboard}
            className={`flex gap-1 items-center ${activeLink === 'home' ? 'text-white' : 'text-white/70'}` }
          >
            <i className="bx bxs-dashboard bx-sm"></i>
            Dashboard
          </li>
          <li
            onClick={navigateToMyTeam}
            className={`flex gap-1 items-center ${activeLink === 'myTeam' ? 'text-white' : 'text-white/70'}` }
          >
            <i className="bx bxs-group bx-sm"></i>
            My Team
          </li>
        
        </ul>
      </div>

      <div
        onClick={navigateToLogin}
        className="flex gap-1 items-center text-white/70 hover:text-yellow-schedulewhiz" 
      >
        <i className="bx bxs-log-out bx-sm"></i>
        Logout
      </div>
    </Card>
  );
};

export default Navbar;
