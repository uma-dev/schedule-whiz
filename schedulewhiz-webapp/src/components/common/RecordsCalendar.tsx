import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getRecordsByEmployeeEmail } from "../../services/getRecordsByEmployeeEmail";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { CalendarEvent } from "../../types/CalendarEvent";
import "./RecordsCalendar.css";

const localizer = momentLocalizer(moment);

const RecordsCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { userEmail, token } = useAuth();
  const today = new Date();

  useEffect(() => {
    const fetchData = async () => {
      const records = await getRecordsByEmployeeEmail(userEmail, token);
      const events: CalendarEvent[] = records.map((r) => {
        // adjust zone -6 in mexico
        const end = new Date(r.startTime);
        end.setHours(end.getHours() + 6);
        // end
        const year = end.getFullYear();
        const month = end.getMonth();
        const day = end.getDate();
        const hour: number = +r.schedule.startTime.substring(0, 2);
        const minutes: number = +r.schedule.startTime.substring(3, 5);
        const start = new Date(year, month, day, hour, minutes);
        // new object that represents events in react calendar
        // compare if record whats in time or early
        return start < end
          ? new CalendarEvent(start, end, <i class="bx bx-check"></i>)
          : new CalendarEvent(end, start, "Early :)");
      });
      setEvents(events);
    };

    fetchData();
  }, [userEmail, token]);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      // start time 7:00am
      min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8)}
      // end time 6:00pm
      max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18)}
    />
  );
};

export default RecordsCalendar;
