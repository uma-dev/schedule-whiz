import Card from "./Card";
import logo from "../assets/logo.png";

const MainPanel = () => {
  return (
    <div className="grid grid-cols-2 gap-16">
      <div className="col-span-2">
        <Card color="my-grey">
          <div className="flex flex-row gap-4 items-center">
            <div className="w-full">
              <h2 className="text-2xl">Hello name!</h2>
              <span>Its good to see you again</span>
            </div>
            <div className="flex justify-center">
              <img src={logo} className="w-6/12" alt="React Image" />
            </div>
          </div>
        </Card>
      </div>

      <div className="col-span-1">
        <Card color="my-grey">fsafsdfjsk</Card>
      </div>

      <div className="col-span-1">
        <Card color="my-grey">safsafsfas</Card>
      </div>

      <div className="col-span-2 bg-sky-50">Calendar</div>
    </div>
  );
};

export default MainPanel;
