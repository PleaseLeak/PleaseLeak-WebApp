import { useContext } from "react";
import ModelsCard from "../../components/Card/ModelsCard";
import {
  Box,
  Heading,
  Text,
  Stack,
  Container,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { appContext } from "../../context/AppContext";
import { userContext } from "../../context/userContext";
import { NavLink } from "react-router-dom";
import { parseToDirectusLink } from "../../utils/tools";
import ButtonSimple from "../../components/Button/ButtonSimple";
export default function HomeFirstSection() {
  const { ModelsFetched, settings } = useContext(appContext);
  const { userLikes } = useContext(userContext);
  let lastModels;
  // if mobile slice -2
  if (window.innerWidth < 768) {
    lastModels = ModelsFetched.data?.data.slice(-2);
  } else {
    lastModels = ModelsFetched.data?.data.slice(-3);
  }

  const qualityBanner =
    settings.bannerQuality === "low"
      ? 150
      : settings.bannerQuality === "medium"
      ? 280
      : 1;

  return (
    <>
      <Box borderRadius={10} bg={useColorModeValue("gray.100", "gray.700")}>
        <Container
          maxW={"full"}
          py={12}
          as={Stack}
          spacing={8}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack spacing={0} align={"center"}>
            <Heading color={"purple.700"}>Latest Models Added</Heading>
            <Text>Get Amazing Mega Link</Text>
          </Stack>
          {/*liste of models with line breaking */}
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 10, md: 4, lg: 10 }}
            style={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {ModelsFetched.data ? (
              <>
                {lastModels.map((model) => (
                  <ModelsCard
                    key={model.id}
                    name={model.name}
                    profilePicture={parseToDirectusLink(model.preview, 180)}
                    preview={parseToDirectusLink(model.banner, qualityBanner)}
                    link={model.link}
                    isLiked={userLikes?.includes(model.id)}
                    modelId={model.id}
                  />
                ))}
              </>
            ) : (
              "Loading..."
            )}
          </Stack>
          <Tooltip
            hasArrow
            label="View all models available"
            bg="gray.300"
            color="black"
          >
            <NavLink to={"/models"}>
              <ButtonSimple>More</ButtonSimple>
            </NavLink>
          </Tooltip>
        </Container>
      </Box>
    </>
  );
}
