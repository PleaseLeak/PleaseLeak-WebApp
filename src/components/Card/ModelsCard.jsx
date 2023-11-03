/* eslint-disable react/prop-types */
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Stack,
  useColorModeValue,
  Spinner,
  useToast,
  IconButton,
  Tooltip,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { useState } from "react";
import "./ModelsCard.css";
import { useNavigate } from "react-router-dom";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { GoReport } from "react-icons/go";
import { memo } from "react";
import ButtonSimple from "../Button/ButtonSimple";

export default memo(function ModelsCard({
  name,
  profilePicture,
  preview,
  link,
  isLiked,
  modelId,
}) {
  const { updateLikes, userLikes, currentUser } = useContext(userContext);
  const [isReported, setIsReported] = useState(false);

  const [isInLike, setIsInLike] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLike = async () => {
    const newLikes = [...userLikes];
    if (isLiked) {
      const index = newLikes.indexOf(modelId);
      newLikes.splice(index, 1);
    } else {
      newLikes.push(modelId);
    }
    try {
      setIsInLike(true);
      await updateLikes(newLikes);
      setIsInLike(false);
      toast({
        title: isLiked ? "Dislike successfully" : "Liked successfully",
        description: "like update on your profile",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        colorScheme: "purple",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsInLike(false);
    }
  };
  const handleLink = () => {
    if (currentUser) {
      window.open(link);
    } else {
      navigate("/sign-in");
    }
  };

  const handleReport = () => {
    const message = {
      message: `
|--${currentUser.email}
|---Models Link Broken---
|________________________
| Models Name: ${name}
|________________________
|
| MegaLink:
| ${link}`,
    };
    fetch("https://telegram.please-leak.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Message Sent.",
          description: "We've sent your message to the developer.",
          status: "success",
          colorScheme: "purple",
          duration: 3000,
          isClosable: true,
        });
      }
    });
    setIsReported(true);
  };

  return (
    <Center py={6}>
      <Box
        maxW={"280px"}
        w={"280px"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        transition="all 0.2s"
        _hover={{
          transform: "scale(1.07)",
          boxShadow: "dark-lg",
        }}
      >
        <Image h={"220px"} w={"full"} src={preview} objectFit={"cover"} />

        <Flex justify={"center"} mt={-16}>
          <Avatar
            size={"2xl"}
            src={profilePicture}
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
            loading="lazy"
            objectFit={"cover"}
          />
        </Flex>

        <Box p={4}>
          <Stack spacing={0} align={"center"} mb={4}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {name}
            </Heading>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={3}>
            <Tooltip hasArrow label="Get mega link" bg="gray.300" color="black">
              <Button
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                color={"white"}
                bg={"purple"}
                onClick={handleLink}
                w={100}
              >
                Link
              </Button>
            </Tooltip>
            <Tooltip
              hasArrow
              label="Like or Dislike"
              bg="gray.300"
              color="black"
            >
              {currentUser ? (
                <IconButton
                  bg={"purple"}
                  color={"white"}
                  rounded={"md"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  icon={
                    !isInLike ? (
                      isLiked ? (
                        <IoMdHeart />
                      ) : (
                        <IoMdHeartEmpty />
                      )
                    ) : (
                      <Spinner size={"xs"} />
                    )
                  }
                  onClick={handleLike}
                ></IconButton>
              ) : (
                <></>
              )}
            </Tooltip>
            {currentUser && !isReported && (
              <Popover>
                <PopoverTrigger>
                  <div>
                    <Tooltip
                      hasArrow
                      label="Report link broken"
                      bg="gray.300"
                      color="black"
                    >
                      <IconButton
                        bg={"purple"}
                        color={"white"}
                        rounded={"md"}
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: "lg",
                        }}
                        icon={<GoReport />}
                      ></IconButton>
                    </Tooltip>
                  </div>
                </PopoverTrigger>

                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>
                    Are you sure the link are broken
                  </PopoverHeader>
                  <PopoverBody gap={5}>
                    <ButtonSimple
                      onClick={handleReport}
                      colorScheme="purple"
                      w={125}
                      m={2}
                    >
                      Yes
                    </ButtonSimple>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            )}
          </Stack>
        </Box>
      </Box>
    </Center>
  );
});
