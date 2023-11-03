import { Heading } from "@chakra-ui/react";
import ListeModels from "../../Models/ListeModels";
import { useState } from "react";
import { useContext } from "react";
import { appContext } from "../../../context/AppContext";
import { userContext } from "../../../context/userContext";
import PageContainer from "../../../components/layout/PageContainer";
import ButtonSimple from "../../../components/Button/ButtonSimple";
import { motion } from "framer-motion";
const Favorites = () => {
  const [numberLoaded, setNumberLoaded] = useState(4);
  const { ModelsFetched } = useContext(appContext);
  const { userLikes } = useContext(userContext);
  const modelsListe =
    ModelsFetched.data?.data.filter((el) => {
      return userLikes?.includes(el.id);
    }) || [];

  return (
    <PageContainer flexDirection={"column"}>
      <Heading mt={10}>Your Favorites</Heading>
      {modelsListe.length > 0 ? (
        <>
          {" "}
          <ListeModels numberLoaded={numberLoaded} models={modelsListe} />
          {modelsListe.length > numberLoaded && (
            <motion.div layoutId="loadMore">
              <ButtonSimple
                mb={5}
                onClick={() => setNumberLoaded((current) => current + 4)}
              >
                Load more
              </ButtonSimple>
            </motion.div>
          )}
        </>
      ) : (
        <Heading mt={10}>You have no favorites yet</Heading>
      )}
    </PageContainer>
  );
};

export default Favorites;
