import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IoCheckmark } from "react-icons/io5";
import { motion } from "framer-motion";

function NextSchedule() {
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
        justify="center"
        p={{ base: 3, md: 8 }}
        gap={6}
        mx="auto"
      >
        <Heading variant="section-title">Schedule</Heading>
        <Flex
          height="100%"
          minH={{ base: "400px", md: "40vh" }}
          justify="center"
          mt={4}
        >
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            maxWidth="800px"
            border="none"
            align="center"
            boxShadow="lg"
            bg={useColorModeValue("white", "#1a1a1a")}
          >
            <Image
              objectFit="cover"
              maxW={{ base: "70%", sm: "300px" }}
              src="/public/images/clock.png"
              alt="Time"
              opacity={0.2}
              p={4}
            />

            <Stack>
              <CardBody>
                <Heading size="md">Next week schedule</Heading>

                <Text py="2">
                  Check out what's coming up next week! Stay organized and plan
                  ahead
                </Text>
              </CardBody>
              <CardFooter>
                <Tag
                  size="lg"
                  key="schedule"
                  variant="subtle"
                  colorScheme="telegram"
                >
                  <TagLeftIcon boxSize="12px" as={IoCheckmark} />
                  <TagLabel>9:00am - 6:00pm</TagLabel>
                </Tag>
              </CardFooter>
            </Stack>
          </Card>
        </Flex>
      </Flex>
    </motion.div>
  );
}

export default NextSchedule;
