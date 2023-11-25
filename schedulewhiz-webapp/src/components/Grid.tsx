import MainPanel from "./MainPanel";
import Navbar from "./Navbar";
import SecondaryPanel from "./SecondaryPanel";

const Grid = () => {
  return (
    <div className="grid grid-cols-11 gap-16 p-10 h-screen bg-white">
      <div className="col-span-2 w-full h-full">
        <Navbar />
      </div>
      <div className="col-span-6 w-full h-full">
        <MainPanel />
      </div>
      <div className="col-start-9 col-span-3 w-full h-full">
        <SecondaryPanel />
      </div>
    </div>
  );
};

export default Grid;