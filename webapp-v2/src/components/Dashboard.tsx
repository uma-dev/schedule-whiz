import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Text,
  Stack,
  Box,
} from "@chakra-ui/react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IoCalendarOutline, IoFastFoodOutline } from "react-icons/io5";
import RecordsCalendar from "./calendar/RecordsCalendar";

function Dashboard() {
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
      <Heading variant="section-title">Dashboard</Heading>

      <HStack justifyContent="space-between">
        <Card
          direction="row"
          size="sm"
          flex="0.49"
          align="center"
          justifyContent="space-evenly"
        >
          <Box display={{ base: "none", md: "flex" }}>
            <IoCalendarOutline size="35" />
          </Box>
          <Stack>
            <CardHeader pb={0}>
              <Heading size="xs" textAlign="center" textTransform="uppercase">
                Schedule
              </Heading>
            </CardHeader>
            <CardBody pt={0}>
              <Text>9:00am - 6:00pm</Text>
            </CardBody>
          </Stack>
        </Card>

        <Card
          direction="row"
          size="sm"
          flex="0.49"
          align="center"
          justifyContent="space-evenly"
        >
          <Box display={{ base: "none", md: "flex" }}>
            <IoFastFoodOutline size="35" />
          </Box>
          <Stack>
            <CardHeader pb={0}>
              <Heading size="xs" textAlign="center" textTransform="uppercase">
                Break
              </Heading>
            </CardHeader>
            <CardBody pt={0}>
              <Text>9:00am - 6:00pm</Text>
            </CardBody>
          </Stack>
        </Card>
      </HStack>

      <RecordsCalendar />
    </Flex>
  );
}

export default Dashboard;
