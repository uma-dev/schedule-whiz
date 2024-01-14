import { useState } from "react";
import getDate from "../../services/getDate";
import Calendar from "react-calendar";

const RecordsCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate: Date | Date[]) => {
    setDate(newDate as Date);
  };

  return (
    <div className="flex flex-col gap-4 px-3 col-span-2 ">
      <div className="flex flex-col ">
        <span className="text-xs">Today</span>
        <span>{getDate()}</span>
      </div>
      <div className="flex justify-center ">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="text-center"
        />
      </div>
    </div>
  );
};

export default RecordsCalendar;
