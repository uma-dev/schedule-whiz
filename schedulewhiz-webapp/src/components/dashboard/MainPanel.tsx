import Card from "../common/Card";
import logo from "../../assets/images/logo.png";

const MainPanel = () => {
  return (
    <div className="grid grid-cols-2 gap-16">
      <Card color="my-grey col-span-2">
        <div className="flex flex-row items-center">
          <div className="w-full flex flex-col flex-1 gap-2">
            <h2 className="text-2xl">Hello name!</h2>
            <span>Its good to see you again</span>
          </div>
          <div className="flex items-center flex-1 h-32 justify-center">
            <img src={logo} className="w-10/12 h-fit" alt="React Image" />
          </div>
        </div>
      </Card>

      <Card color="my-grey col-span-1 ">
        <h3 className="text-2xl">7:30am - 4:00pm</h3>
        Schedule this week
      </Card>

      <Card color="my-grey col-span-1">
        <h3 className="text-2xl">2:30am - 3:30pm</h3>
        Break
      </Card>

      <div className="flex flex-col p-3 gap-4 col-span-2 h-full">
        January 7, 2024
        <span className="text-xl">Today</span>
      </div>
    </div>
  );
};

export default MainPanel;
