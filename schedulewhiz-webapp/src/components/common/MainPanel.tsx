import Card from "../common/Card";
import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { Employee } from "../../types/Employee";
import { getEmployeeById } from "../../services/employeeService";

interface Props {
  employeeId: number;
}

const MainPanel = ({ employeeId }: Props) => {
    
const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const employeeData = await getEmployeeById(employeeId);
        setEmployee(employeeData);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-16">
      <Card color="my-grey col-span-2">
        <div className="flex flex-row items-center">
          <div className="w-full flex flex-col flex-1 min-w-fit gap-2">
            <h2 className="text-xl">{`Hello ${employee.names}!`}</h2>
            <span>Its good to see you again</span>
          </div>
          <div className="flex items-center max-w-xs flex-1 h-fit justify-center">
            <img src={logo} className="max-w-[60%] h-fit" alt="Logo" />
          </div>
        </div>
      </Card>

      <Card color="my-grey col-span-1 ">
        <h3 className="text-xl">7:30am - 4:00pm</h3>
        Schedule this week
      </Card>

      <Card color="my-grey col-span-1">
        <h3 className="text-xl">2:30am - 3:30pm</h3>
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
