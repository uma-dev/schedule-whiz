import { Schedule } from "./Schedule";
import { Team } from "./Team";

export interface Employee {
  id: number;
  names: string;
  firstSurname: string;
  secondSurname: string;
  schedule: Schedule;
  managedTeam: Team;
  team: Team;
}
