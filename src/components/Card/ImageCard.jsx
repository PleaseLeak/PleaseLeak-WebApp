import React from "react";
import {
  Card,
  Image,
  Flex,
  useToast,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import ButtonSimple from "../Button/ButtonSimple";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
const ImageCard = ({ isBlur, isLiked, id }) => {
  const { updateAiPictures, userAiPicture, currentUser } =
    useContext(userContext);
  const handleDownload = () => {
    //download image with url
    const fileName = id + "png";
    fetch("https://ai-secret.please-leak.com/uploads/" + id)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName + ".png");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [isInLike, setIsInLike] = useState(false);
  const toast = useToast();
  const handleLike = async () => {
    //url without data:image/png;base64,
    let newUserAiPicture;
    if (isLikedState) {
      newUserAiPicture = userAiPicture.filter((picture) => picture !== id);
    } else {
      newUserAiPicture = [...userAiPicture, id];
    }
    setIsInLike(true);
    await updateAiPictures(newUserAiPicture);
    if (!isLikedState) {
      setIsLikedState(true);
    } else {
      setIsLikedState(false);
    }
    setIsInLike(false);
    toast({
      title: "Image added to your library.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <Card p={4}>
      <Image
        src={"https://ai-secret.please-leak.com/uploads/" + id}
        style={{
          height: "400px",
          objectFit: "cover",
          objectPosition: "center",
          filter: isBlur ? "none" : "blur(7px)",
        }}
      />

      <Flex gap={2} mt={4} justifyContent={"center"}>
        <ButtonSimple onClick={handleDownload}>Download</ButtonSimple>
        {!isBlur && (
          <Flex
            position={"absolute"}
            top={0}
            left={0}
            right={0}
            bottom={0}
            justifyContent={"center"}
            alignItems={"center"}
            bg={"rgba(0,0,0,0.1)"}
          >
            <NavLink to={"/sign-in"}>
              <ButtonSimple>Login</ButtonSimple>
            </NavLink>
          </Flex>
        )}
        {currentUser && (
          <IconButton
            bg={"purple"}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            aria-label="Like"
            icon={
              isInLike ? (
                <Spinner />
              ) : isLikedState ? (
                <IoMdHeart />
              ) : (
                <IoMdHeartEmpty />
              )
            }
            onClick={handleLike}
            isLoading={isInLike}
          />
        )}
      </Flex>
    </Card>
  );
};

export default ImageCard;
