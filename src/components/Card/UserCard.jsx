/* eslint-disable react/prop-types */
import {
  Heading,
  Avatar,
  Box,
  Center,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { userContext } from "../../context/userContext";

export default function UserCard({ user, isFriend }) {
  const { addFriends, removeFriends } = useContext(userContext);

  const handleAddFriends = async () => {
    if (isFriend) {
      await removeFriends(user);
    } else {
      await addFriends(user);
    }
  };

  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={user.photoUrl}
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {user.displayName}
        </Heading>

        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
          >
            Message
          </Button>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"purple.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "purple.500",
            }}
            _focus={{
              bg: "purple.500",
            }}
            onClick={handleAddFriends}
          >
            {isFriend ? "Remove Friend" : "Add Friend"}
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
