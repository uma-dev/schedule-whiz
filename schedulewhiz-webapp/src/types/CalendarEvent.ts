import { ReactNode } from "react";

export class CalendarEvent {
  start: Date;
  end: Date;
  title: ReactNode;
  colorEvento: string;

  constructor(startTime: Date, endTime: Date) {
    if (startTime > endTime) {
      this.start = endTime;
      this.end = startTime;
    } else {
      this.start = startTime;
      this.end = endTime;
    }

    const elapsed = endTime.getTime() - startTime.getTime();
    const delayInMinutes = Math.round(elapsed / 1000 / 60);
    const tolerance = 15;

    if (delayInMinutes < tolerance) {
      this.title = "✓";
      this.colorEvento = "green";
    } else {
      this.title = "✗";
      this.colorEvento = "#EBB200";
    }
  }
}
