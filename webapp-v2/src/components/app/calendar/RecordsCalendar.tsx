import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "./RecordsCalendar.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const localizer = momentLocalizer(moment);
const currentDate = new Date().toLocaleDateString(undefined, {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const CustomToolbar = ({ onNavigate }) => {
  return (
    <div className="custom-toolbar">
      <div>
        <button onClick={() => onNavigate("PREV")}>
          <IoChevronBack />
        </button>
        <button onClick={() => onNavigate("TODAY")}>Today</button>
        <button onClick={() => onNavigate("NEXT")}>
          <IoChevronForward />
        </button>
      </div>
      <div>{currentDate}</div> {/* Display current date */}
    </div>
  );
};

const RecordsCalendar = () => {
  return (
    <Calendar
      localizer={localizer}
      components={{
        toolbar: CustomToolbar,
      }}
      defaultView={Views.MONTH}
      views={[Views.MONTH]}
      min={moment("2024-03-10T07:00:00").toDate()} // start 7:00am
      max={moment("2024-03-10T19:00:00").toDate()} // end   7:00pm
      startAccessor="start"
      endAccessor="end"
      style={{ height: "65vh", minHeight: "400px" }}
    />
  );
};

export default RecordsCalendar;
