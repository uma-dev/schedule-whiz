import { useState } from "react";
import Calendar from "react-calendar";
import "./RecordsCalendar.css";

const RecordsCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate: Date | Date[]) => {
    setDate(newDate as Date);
  };

  return (
    <div className="flex flex-col justify-center items-center col-span-2">
      <span className="text-xs text-center">Today</span>
      <Calendar
        onChange={handleDateChange}
        value={date}
        // Start the calendar with sunday
        calendarType="gregory"
        className="react-calendar"
      />
    </div>
  );
};

export default RecordsCalendar;
