import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

import { useRef } from "react";
import { useContext } from "react";
import { userContext } from "../../../context/userContext";
import PageContainer from "../../../components/layout/PageContainer";
import ModelsDrawer from "./Components/ModelsDrawer";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
export default function Profile() {
  const { currentUser, updateUserInfo, updateUserEmail, updateUserPassword } =
    useContext(userContext);
  const [isInSaving, setIsInSaving] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profilUrl, setProfilUrl] = useState(currentUser.photoURL);

  const allInputs = useRef([]);
  const addInput = (el) => {
    if (el && !allInputs.current.includes(el)) {
      allInputs.current.push(el);
    }
  };
  const [hasUpdatePhotoUrl, setHasUpdatePhotoUrl] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsInSaving(true);
    const username = allInputs.current[0].value;
    const email = allInputs.current[1].value;
    const password = allInputs.current[2].value;
    console.log(username, email, password, profilUrl, currentUser.photoURL);

    if (username !== currentUser.displayName) {
      await updateUserInfo({
        displayName: username,
      });
    }
    if (email !== currentUser.email) {
      await updateUserEmail(email);
    }
    if (profilUrl !== currentUser.photoURL) {
      await updateUserInfo({
        photoURL: profilUrl,
      });
      setHasUpdatePhotoUrl(true);
    }
    if (password !== "" && password.length > 6) {
      await updateUserPassword(password);
    }
    setIsInSaving(false);
  };

  console.log(profilUrl);

  return (
    <PageContainer>
      <ModelsDrawer
        isOpen={isOpen}
        onClose={onClose}
        setProfilUrl={setProfilUrl}
      />

      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <Stack
            direction={["column", hasUpdatePhotoUrl ? "column" : "row"]}
            spacing={6}
          >
            <Center>
              {!isOpen && (
                <motion.div layoutId={profilUrl}>
                  <Avatar
                    size="xl"
                    src={
                      profilUrl
                        ? profilUrl
                        : "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                    }
                  >
                    {!hasUpdatePhotoUrl && (
                      <AvatarBadge
                        as={IconButton}
                        size="sm"
                        rounded="full"
                        top="-10px"
                        colorScheme="red"
                        aria-label="remove Image"
                        icon={<SmallCloseIcon />}
                        onClick={() => {
                          setProfilUrl(
                            "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                          );
                        }}
                      />
                    )}
                  </Avatar>
                </motion.div>
              )}
            </Center>

            {!hasUpdatePhotoUrl && (
              <Center w="full">
                <Button onClick={onOpen} w="full">
                  Change Icon
                </Button>
              </Center>
            )}
          </Stack>
        </FormControl>
        <FormControl id="userName">
          <FormLabel>User name</FormLabel>
          <Input
            ref={addInput}
            defaultValue={currentUser.displayName}
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            defaultValue={currentUser.email}
            ref={addInput}
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <Stack alignItems={"center"} direction={["column", "row"]} spacing={6}>
          <FormControl id="password">
            <Input
              ref={addInput}
              placeholder="Password"
              _placeholder={{ color: "gray.500" }}
              type="password"
            />
          </FormControl>
        </Stack>

        <Stack spacing={6} direction={["column", "row"]}>
          {!hasUpdatePhotoUrl ? (
            <>
              <NavLink to={-1}>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                >
                  Cancel
                </Button>
              </NavLink>
              <Button
                bg={"purple.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "purple.500",
                }}
                onClick={handleSubmit}
              >
                {isInSaving ? <Spinner /> : "Save"}
              </Button>
            </>
          ) : (
            <Center w={"100%"}>
              <Button
                onClick={() => {
                  location.reload();
                }}
                colorScheme="purple"
                w={120}
              >
                Refresh
              </Button>
            </Center>
          )}
        </Stack>
      </Stack>
    </PageContainer>
  );
}
