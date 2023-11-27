import Card from "./Card";
import {useNavigate} from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate(); 

    const navigateToLogin = () => {
        navigate('/login');
    };

  return (
    <Card color="black-stone flex flex-col h-full justify-between">
      <div className="flex flex-col gap-12">
          <h1 className="flex flex-col text-3xl text-white">
            Schedule
            <span className="text-yellow-schedulewhiz"> Whiz</span>
          </h1>

          <ul className="flex flex-col gap-12 text-base">
            <li className="flex gap-1 text-white/70 hover:text-white items-center ">
              <i className="bx bxs-dashboard bx-sm"></i>
              Dashboard
            </li>
            <li className="flex gap-1 text-white/70 hover:text-white items-center">
              <i className="bx bxs-group bx-sm"></i>
              My Team
            </li>
            <li className="flex gap-1 text-white/70 hover:text-white items-center">
              <i className="bx bxs-cog bx-sm"></i>
              Settings
            </li>
          </ul>
      </div>
            
            <div onClick={navigateToLogin} className="flex gap-1 text-white/70 hover:text-white items-center">
        <i className="bx bxs-log-out bx-sm"></i>
        Logout 
      </div>

    </Card>
  );
};

export default Navbar;
