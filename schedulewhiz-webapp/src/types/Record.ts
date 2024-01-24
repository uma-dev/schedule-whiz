import { Employee } from "./Employee";
import { Issue } from "./Issue";
import { Schedule } from "./Schedule";

export interface Record {
  id: number;
  employee: Employee;
  schedule: Schedule;
  issue: Issue;
  startTime: Date;
}
