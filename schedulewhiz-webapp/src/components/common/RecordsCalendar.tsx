import { useState } from "react";
import Calendar from "react-calendar";
import "./RecordsCalendar.css";

const RecordsCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate: Date | Date[]) => {
    setDate(newDate as Date);
  };

  return (
    <div className="flex flex-col gap-4 px-3 col-span-2 ">
      <div className="flex flex-col ">
        <span className="text-xs">Today</span>
      </div>
      <div className="flex justify-center ">
        <Calendar
          onChange={handleDateChange}
          value={date}
          // Start the calendar with sunday
          calendarType="gregory"
        />
      </div>
    </div>
  );
};

export default RecordsCalendar;
