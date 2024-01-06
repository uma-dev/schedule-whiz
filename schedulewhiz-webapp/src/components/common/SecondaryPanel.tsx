import { useEffect, useState } from "react";
import { Record } from "../../types/Record";
import Card from "../common/Card";
import useAuth from "../../hooks/useAuth";
import { getRecordsByEmployeeEmail } from "../../services/getRecordsByEmployeeEmail";

const SecondaryPanel = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const { userEmail, token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRecords = await getRecordsByEmployeeEmail(
          userEmail,
          token,
        );
        setRecords(fetchedRecords);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
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
      <Card color="my-blue">
        <h2 className="text-base text-white">My records</h2>
        <p className="text-slate-400 text-sm">of the month</p>
      </Card>
      <Card color="yellow-alert flex flex-row gap-2 items-end">
        <span className="text-lg text-black font-bold">{`${records.length}`}</span>
        <p className="text-slate-700 text-sm">records in the month</p>
      </Card>
    </div>
  );
};

export default SecondaryPanel;
