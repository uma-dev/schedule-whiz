import { Flex, Heading, Select } from "@chakra-ui/react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import RecordsCalendar from "./calendar/RecordsCalendar";

function Team() {
  return (
    <Flex
      direction={"column"}
      height="100%"
      width="100%"
      maxWidth="900px"
      p={{ base: 3, md: 8 }}
      gap={6}
      mx="auto"
    >
      <Heading variant="section-title">Team</Heading>
      <Select placeholder="Select an member" variant="Flushed" bg="#f0eee1">
        <option value="option1">Member 1</option>
        <option value="option1">Member 2</option>
        <option value="option1">Member 3</option>
      </Select>

      <RecordsCalendar />
    </Flex>
  );
}

export default Team;
