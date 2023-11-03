import React from "react";
import PageContainer from "../../components/layout/PageContainer";
import { useContext } from "react";
import { appContext } from "../../context/AppContext";
import {
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { parseToDirectusLink } from "../../utils/tools";
import VideosCard from "../../components/Card/VideosCard";
import ButtonSimple from "../../components/Button/ButtonSimple";

const Videos = () => {
  const { VideosFetched } = useContext(appContext);
  const [numberLoaded, setNumberLoaded] = useState(6);
  const [SelectedVideos, setSelectedVideos] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <PageContainer flexDirection={"column"}>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enjoy and Cum</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {VideosFetched.data?.data[SelectedVideos] && (
              <video
                controls
                src={parseToDirectusLink(
                  VideosFetched.data?.data[SelectedVideos].videos
                )}
              ></video>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Heading m={5}>Videos</Heading>

      <Flex mb={10} gap={5} w={"100%"} wrap={"wrap"} justifyContent={"center"}>
        {VideosFetched.data?.data.slice(0, numberLoaded).map((el, key) => {
          return (
            <div
              onClick={() => {
                setSelectedVideos(key);
                onOpen();
              }}
              key={el.id}
            >
              <VideosCard
                url={parseToDirectusLink(el.preview)}
                alt={el.preview}
                link={"carroussel/ass/" + key}
              />
            </div>
          );
        })}
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

export default Videos;
