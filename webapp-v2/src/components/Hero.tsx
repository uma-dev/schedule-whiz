import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Hero() {
  return (
    <Container maxW={"3xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 8 }}
        py={{ base: 10, md: 10 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
          lineHeight={"110%"}
        >
          Manage your schedules{" "}
          <Text as={"span"} color={"yellow"}>
            easy
          </Text>
        </Heading>
        <Text
          color={useColorModeValue("gray.500", "gray.300")}
          maxW={{ base: "xs", md: "xl" }}
        >
          Discover the optimization tool to cratf the perfect schedule in the
          world of flexibility and remote work.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button px={4} bg="yellow" as={"a"} href="/register">
            Get started
          </Button>
          <Button
            px={4}
            as={"a"}
            href="https://github.com/uma-dev/schedule-whiz"
            target="_blank"
          >
            Learn more
          </Button>
        </Stack>
        <Flex w={"full"} justify="center">
          <Image
            objectFit="cover"
            src="/public/images/app.png"
            alt="Dan Abramov"
            width={{ sm: "400px", lg: "500px" }}
            mt={{ base: 1, sm: 4 }}
          />
        </Flex>
      </Stack>
    </Container>
  );
}
