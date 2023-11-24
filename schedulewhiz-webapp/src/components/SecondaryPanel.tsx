import Card from "./Card";

const SecondaryPanel = () => {
  return (
    <div className="flex flex-col gap-16 ">
      <Card color="my-blue">
        <h2 className="text-2xl text-white">Title</h2>
        <p className="text-slate-400">jejejj ffdsf</p>
      </Card>
      <Card color="my-blue">
        <h2 className="text-2xl text-white">Title</h2>
        <p className="text-slate-400">jejejj ffdsf</p>
      </Card>
      <Card color="my-blue">
        <h2 className="text-2xl text-white">Title</h2>
        <p className="text-slate-400">jejejj ffdsf</p>
      </Card>
      <Card color="my-grey">
        <h2 className="text-2xl text-black">Title</h2>
        <p className="text-slate-400">The word</p>
      </Card>
    </div>
  );
};

export default SecondaryPanel;
