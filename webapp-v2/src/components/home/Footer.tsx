import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface LogoProps {
  width: string;
}

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      viewBox="0 0 288 289"
      {...props}
    >
      <path
        fill="#BF8000"
        fillOpacity=".3"
        d="M42.9 40.7c-1.3 1.6-1.2 1.7.4.4.9-.7 1.7-1.5 1.7-1.7 0-.8-.8-.3-2.1 1.3m-5 5c-1.3 1.6-1.2 1.7.4.4.9-.7 1.7-1.5 1.7-1.7 0-.8-.8-.3-2.1 1.3m219.2 81.9c0 1.1.3 1.4.6.6.3-.7.2-1.6-.1-1.9-.3-.4-.6.2-.5 1.3m-35.3 6.1c.6.2 1.8.2 2.5 0 .6-.3.1-.5-1.3-.5s-1.9.2-1.2.5m10.5 0c.9.2 2.3.2 3 0 .6-.3-.1-.5-1.8-.5-1.6 0-2.2.2-1.2.5m-33.8 7.3c-.3.6.1.7.9.4 1.8-.7 2.1-1.4.7-1.4-.6 0-1.3.4-1.6 1"
      />
      <g fill="#BF8000" strokeWidth="0">
        <path d="M110 7.5c-22 3.7-45.3 14.2-59.8 27-24.3 21.3-38 44.8-43.6 74.4C4.8 118.5 4.5 142 6 152c4.4 28.3 16.7 52 37.7 72.7 5.2 5.1 9.8 9.3 10.3 9.3s1.5.6 2.2 1.4c2.4 2.4 14 9 22.8 13 14.5 6.6 28.9 9.7 47.5 10.3 12.5.4 16.3.2 17.6-.9.9-.7 2.8-6 4.2-11.8 6-24 10.7-44 11.6-49.6 1.7-10.5 6.7-23.3 12.6-31.8 6.5-9.4 22.4-22.9 29.5-25.1 1.4-.4 3-1.1 3.5-1.5 1.1-.8 6.1-2.2 12.5-3.6 6.2-1.3 22.1-.7 24.8 1 .5.3 2.4.8 4.3 1.1s4.4 1.3 5.7 2.1c4.7 3.1 5.5 1.4 4.7-9.9-.8-13.9-1.1-15.9-3.6-25.7-.6-2.5-1.3-5.6-1.5-7-.8-3.8-7.3-18.6-11.7-26.5-6.2-11-12.9-19.4-23.3-29.5-18.5-17.7-39.9-28.3-65.9-32.5-10.8-1.8-31.1-1.8-41.5 0m28.6 30c5.3 3.4 5.4 4.7 5.4 53.7 0 43.7-.1 45.4-2 48.6-3.6 5.9-5.6 6.2-39 6.2-31.9 0-34.4-.3-38.4-4.9-2.3-2.6-3.3-11-1.7-14.9.7-1.6 2.9-3.9 5-5 3.7-2.1 5.2-2.2 27-2.2H118V81.7c0-35.5.1-37.3 2-40.5 3.7-6 12.5-7.7 18.6-3.7" />
        <path d="M216.3 161.4c-6.9 2.2-12.9 6.3-17.6 11.8-7.4 8.7-10.5 16.3-12.7 30.8-1.3 8.6-4.4 21.4-10.1 41.3-2.8 10.1-3.9 15.7-3.9 20.8v6.9h41.8l.7 3.7c.4 2.1 1.9 4.8 3.7 6.5 2.7 2.5 3.7 2.8 10.2 2.8 4.9 0 7.9-.5 9.4-1.6 2.6-1.8 5.2-6.5 5.2-9.4 0-2 .5-2 21-2h21v-8.9c0-6.4-.7-11.2-2.4-17.2-4.2-14.3-8.5-32.1-10.2-42-3.7-21.9-11.1-33.7-25.7-41-5.5-2.9-7.3-3.3-16.2-3.6-6.6-.2-11.4.2-14.2 1.1" />
      </g>
      <path
        fill="#FFBF00"
        d="M125.3 36.5c-1.8.8-4.2 2.9-5.3 4.7-1.9 3.2-2 5-2 40.5V119H95c-25 0-26.7.3-30.9 5.6-2.8 3.5-2.8 10.7-.1 15.2 3.6 5.9 5.6 6.2 39.2 6.2 34 0 35.4-.3 39-7 1.7-3.3 1.8-6.3 1.6-49.5-.3-43.7-.4-46.1-2.3-48.9-3.4-5.1-10.1-6.8-16.2-4.1"
      />
    </svg>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.300", "gray.600")}
    >
      <Container
        as={Stack}
        maxW="20"
        py={4}
        justify={"center"}
        align={"center"}
      >
        <Logo width="25px" />
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.100", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify="center"
          align={{ base: "center", md: "center" }}
        >
          <Text>
            &copy; {new Date().getFullYear()} Omar Roldán Guerra. All rights
            reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}