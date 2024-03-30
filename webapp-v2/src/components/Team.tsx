import { Flex, Heading, Select, useColorModeValue } from "@chakra-ui/react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import RecordsCalendar from "./calendar/RecordsCalendar";
import { motion } from "framer-motion";

function Team() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
        <Select
          placeholder="Select an member"
          variant="Flushed"
          bg={useColorModeValue("#f0eee1", "#1a1a1a")}
        >
          <option value="option1">Member 1</option>
          <option value="option1">Member 2</option>
          <option value="option1">Member 3</option>
        </Select>

        <RecordsCalendar />
      </Flex>
    </motion.div>
  );
}

export default Team;
