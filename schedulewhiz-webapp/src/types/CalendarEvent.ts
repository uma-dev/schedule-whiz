export class CalendarEvent {
  start: Date;
  end: Date;
  title: string;

  constructor(startTime: Date, endTime: Date, tittle: string) {
    this.start = startTime;
    this.end = endTime;
    this.title = tittle;
  }
}
