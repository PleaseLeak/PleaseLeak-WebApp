import React from "react";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import PageContainer from "../../components/layout/PageContainer";
import ImageCard from "../../components/Card/ImageCard";
import { Heading, Flex } from "@chakra-ui/react";
import { useState } from "react";
import ButtonSimple from "../../components/Button/ButtonSimple";
const PicturesSaved = () => {
  const { userAiPicture } = useContext(userContext);
  const [numberLoaded, setNumberLoaded] = useState(4);

  return (
    <PageContainer gap={5} p={10} flexDirection={"column"}>
      <Flex wrap={"wrap"} justifyContent={"center"} gap={4}>
        {userAiPicture.slice(0, numberLoaded).map((picture) => {
          console.log(picture);
          const isLiked = userAiPicture.some((pic) => pic === picture);
          return (
            <ImageCard
              key={picture}
              id={picture}
              isLiked={isLiked}
              isBlur={true}
            />
          );
        })}
        {userAiPicture.length === 0 && (
          <Heading className="text-2xl text-gray-400">
            No pictures saved
          </Heading>
        )}
      </Flex>
      <ButtonSimple
        onClick={() => {
          setNumberLoaded((current) => current + 4);
        }}
      >
        More
      </ButtonSimple>
    </PageContainer>
  );
};

export default PicturesSaved;
