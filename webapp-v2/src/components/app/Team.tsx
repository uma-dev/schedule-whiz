import { Flex, Heading, Select, useColorModeValue } from "@chakra-ui/react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import RecordsCalendar from "./calendar/RecordsCalendar";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/data/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router";

function Team() {
  const [employees, setEmployees] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  // state updated when your app is mounted the 2nd time
  const effectRun = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const id = 1;
    const controller = new AbortController();

    const getEmployees = async () => {
      try {
        // TODO: change url to include id
        // axios Private will handle when access token need to be refresh
        const response = await axiosPrivate.get(`/api/employees/byTeam/${id}`, {
          signal: controller.signal,
        });
        isMounted && setEmployees(response.data);
      } catch (err) {
        console.error(err);
        // when refresh token expires, go to login to get a new access token
        if (err.response?.status === 403) {
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    // avoid canceledError for mounting twice (React strict mode)
    if (effectRun.current) {
      getEmployees();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, []);

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
          placeholder={employees?.length ? "Select an member" : "Empty team"}
          isDisabled={!employees?.length}
          variant="Flushed"
          bg={useColorModeValue("#f0eee1", "#1a1a1a")}
        >
          {employees?.length > 0 &&
            employees.map((employee) => (
              <option key={employee?.id} value={employee?.id}>
                {employee?.names}
              </option>
            ))}
        </Select>
        <RecordsCalendar />
      </Flex>
    </motion.div>
  );
}

export default Team;
