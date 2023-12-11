import { Schedule } from "./Schedule";
import { Team } from "./Team";

export interface Employee {
  id: number;
  names: string;
  firstSurname: string;
  secondSurname: string;
  email: string;
  imageUrl: string;
  team: Team;
  managedTeam: Team;
  schedule: Schedule;
}
