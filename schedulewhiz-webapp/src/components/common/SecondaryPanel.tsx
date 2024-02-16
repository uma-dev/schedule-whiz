import { useEffect, useState } from "react";
import Card from "../common/Card";
import useAuth from "../../hooks/useAuth";
import { getNumRecordsByEmployeeEmailAndMonth } from "../../services/getNumRecordsByEmployeeEmailAndMonth";

const SecondaryPanel = () => {
  const [numOfRecords, setNumOfRecords] = useState<number>();
  const { userEmail, token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const numFindedRecords = await getNumRecordsByEmployeeEmailAndMonth(
        userEmail,
        token,
      );
      setNumOfRecords(numFindedRecords);
    };

    fetchData();
  }, [userEmail, token]);

  return (
    <div className="flex flex-col gap-10">
      <Card color="my-blue">
        <h2 className="text-base text-white">Next week schedule</h2>
        <p className="text-slate-400 text-sm">Make a request</p>
      </Card>
      <Card color="my-blue">
        <h2 className="text-base text-white">Request vacations</h2>
        <p className="text-slate-400 text-sm">Make a request</p>
      </Card>
      <Card color="yellow-schedulewhiz flex flex-row gap-2 items-end">
        <span className="text-lg text-black font-bold">{`${numOfRecords}`}</span>
        <p className="text-slate-700 text-sm">records this month</p>
      </Card>
    </div>
  );
};

export default SecondaryPanel;
