/* eslint-disable react/prop-types */
import { useContext } from "react";
import ModelsCard from "../../components/Card/ModelsCard";
import { Container, Flex } from "@chakra-ui/react";
import { userContext } from "../../context/userContext";
import { appContext } from "../../context/AppContext";
import { parseToDirectusLink } from "../../utils/tools";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const ListeModels = ({ models, numberLoaded }) => {
  const { userLikes } = useContext(userContext);
  const { settings } = useContext(appContext);

  const qualityBanner =
    settings.bannerQuality === "low"
      ? 150
      : settings.bannerQuality === "medium"
      ? 280
      : 1;

  return (
    <Container maxW={"100%"}>
      <Flex flexWrap="wrap" w={"full"} gridGap={6} justify="center">
        <AnimatePresence>
          {models.slice(0, numberLoaded).map((model, index) => {
            const tempDelay = 0.3 * index;
            const delay =
              numberLoaded > 4
                ? tempDelay - 0.3 * (numberLoaded - 4)
                : tempDelay;

            return (
              <motion.div
                initial={{ opacity: 0, x: -75 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay, duration: 0.5 }}
                key={model.id}
                layout={index}
              >
                <ModelsCard
                  name={model.name}
                  profilePicture={parseToDirectusLink(model.preview, 180)}
                  preview={parseToDirectusLink(model.banner, qualityBanner)}
                  link={model.link}
                  isLiked={userLikes?.includes(model.id)}
                  modelId={model.id}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Flex>
    </Container>
  );
};

export default ListeModels;
