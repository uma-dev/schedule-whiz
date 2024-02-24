import Card from "../common/Card";
import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { Employee } from "../../types/Employee";
import useAuth from "../../hooks/useAuth";
import RecordsCalendar from "./RecordsCalendar";
import useApiPrivate from "../../hooks/useApiPrivate";

const MainPanel = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const { userEmail } = useAuth();
  const apiPrivate = useApiPrivate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const employeeData = await apiPrivate.get(
          `/api/employees/search?employeeEmail=${userEmail}`,
        );
        setEmployee(employeeData.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployee();
  }, [apiPrivate, userEmail]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-12 h-full">
      <Card color="my-grey col-span-2">
        <div className="flex flex-row items-center">
          <div className="w-full flex flex-col flex-1 min-w-fit gap-2">
            <h2 className="font-semibold">{`Hello ${employee.names}!`}</h2>
            <span>Its good to see you again</span>
          </div>
          <div className="flex items-center max-w-xs flex1 h-fit justify-center">
            <img src={logo} className="max-w-[60%] h-fit max-h-14" alt="Logo" />
          </div>
        </div>
      </Card>

      <Card color="my-grey flex flex-row items-center gap-4 justify-center">
        <div className="flex flex-col items-center">
          <i className="bx bx-calendar bx-md"></i>
        </div>
        <div className="flex flex-col items-center">
          {employee.schedule != null && (
            <h3 className="font-bold">{`${employee.schedule.name}`}</h3>
          )}
          <span className="text-xs">Weekly agenda</span>
        </div>
      </Card>

      <Card color="my-grey flex flex-row items-center gap-4 justify-center">
        <div className="flex flex-col items-center">
          <i className="bx bx-bowl-hot bx-md"></i>
        </div>
        <div className="flex flex-col items-center">
          {employee.schedule != null && (
            <h3 className="font-bold">14:30 - 15:30</h3>
          )}
          <span className="text-xs">Meal break</span>
        </div>
      </Card>

      <div className="col-span-2" style={{ height: "55vh" }}>
        <RecordsCalendar />
      </div>
    </div>
  );
};

export default MainPanel;
