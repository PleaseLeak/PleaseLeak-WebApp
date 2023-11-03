import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  FormControl,
  Input,
  Container,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeHero() {
  const navigate = useNavigate();
  const inputSearch = useRef();
  const handleSearch = () => {
    navigate("/models/" + inputSearch.current.value);
  };
  return (
    <>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 36 }}
        className="hero-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image w={20} src="PleaseLeak.svg" alt="" />
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "3xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Please
          <Text as={"span"} color="purple.500">
            &nbsp;Leak
          </Text>
        </Heading>

        <Stack spacing={4} as={Container} maxW={"xl"} textAlign={"center"}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <FormControl display={"flex"} gap={3}>
              <Input
                color={"black"}
                background={"white"}
                mb={10}
                ref={inputSearch}
                type="text"
                placeholder="Search Models"
              />
              <Button px={6} colorScheme="purple" onClick={handleSearch}>
                Search
              </Button>
            </FormControl>
          </form>
        </Stack>
      </Stack>
    </>
  );
}
