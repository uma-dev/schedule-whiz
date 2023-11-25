import Card from "./Card";

const SecondaryPanel = () => {
  return (
    <div className="flex flex-col gap-16 ">
      <div className="flex flex-row justify-end gap-6">
        <i className="bx bxs-bell bx-sm"></i>
        <i className="bx bxs-user-circle bx-sm"></i>
      </div>
      <Card color="my-blue">
        <h2 className="text-base text-white">Next week schedule</h2>
        <p className="text-slate-400 text-sm">Make a request</p>
      </Card>
      <Card color="my-blue">
        <h2 className="text-base text-white">Request vacations</h2>
        <p className="text-slate-400 text-sm">Make a request</p>
      </Card>
      <Card color="my-blue">
        <h2 className="text-base text-white">My records</h2>
        <p className="text-slate-400 text-sm">of the month</p>
      </Card>
      <Card color="yellow-alert flex flex-row gap-2 items-end">
        <h2 className="text-4xl text-black font-black">2</h2>
        <p className="text-slate-400">issues in the month</p>
      </Card>
    </div>
  );
};

export default SecondaryPanel;