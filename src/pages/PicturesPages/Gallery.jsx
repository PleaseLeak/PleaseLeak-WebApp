import { Flex, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { appContext } from "../../context/AppContext";
import PageContainer from "../../components/layout/PageContainer";
import { useState } from "react";
import ButtonSimple from "../../components/Button/ButtonSimple";
import PicturesCard from "../../components/Card/ImageCard";
import { useEffect } from "react";
import { getGalleryImage } from "../../utils/fetchs";

const AssPictures = () => {
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    const images = getGalleryImage(10).then(() => {
      setGallery(images);
    });
  }, []);
  const [numberLoaded, setNumberLoaded] = useState(4);
  const { userAiPicture } = useContext(appContext);

  return (
    <PageContainer flexDirection={"column"}>
      <Heading m={5}>Ass Pictures</Heading>
      <Flex mb={10} gap={5} w={"100%"} wrap={"wrap"} justifyContent={"center"}>
        {gallery.slice(0, numberLoaded).map((el) => {
          const isLiked = userAiPicture.some((pic) => pic === el);

          return (
            <PicturesCard key={el} id={el} isLiked={isLiked} isBlur={true} />
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

export default AssPictures;
