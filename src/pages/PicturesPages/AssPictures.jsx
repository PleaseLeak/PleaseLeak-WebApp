import { Flex, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { appContext } from "../../context/AppContext";
import { parseToDirectusLink } from "../../utils/tools";
import PageContainer from "../../components/layout/PageContainer";
import { useState } from "react";
import ButtonSimple from "../../components/Button/ButtonSimple";
import PicturesCard from "../../components/Card/PicturesCard";

const AssPictures = () => {
  const { AssPicturesFetched } = useContext(appContext);
  const [numberLoaded, setNumberLoaded] = useState(4);
  const { settings } = useContext(appContext);
  const qualityPicture =
    settings.picturesQuality === "low"
      ? 150
      : settings.picturesQuality === "medium"
      ? 280
      : 1;

  return (
    <PageContainer flexDirection={"column"}>
      <Heading m={5}>Ass Pictures</Heading>
      <Flex mb={10} gap={5} w={"100%"} wrap={"wrap"} justifyContent={"center"}>
        {AssPicturesFetched.data?.data.slice(0, numberLoaded).map((el, key) => {
          return (
            <PicturesCard
              key={el.id}
              url={parseToDirectusLink(el.image, qualityPicture)}
              alt={el.image}
              link={"carroussel/ass/" + key}
            />
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
