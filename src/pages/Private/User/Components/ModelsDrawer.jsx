/* eslint-disable react/prop-types */
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Button,
  Avatar,
  Box,
  Input,
} from "@chakra-ui/react";
import { useContext } from "react";
import { appContext } from "../../../../context/AppContext";
import { useState } from "react";
import { parseToDirectusLink } from "../../../../utils/tools";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function ModelsDrawer({ isOpen, onClose, setProfilUrl }) {
  const { ModelsFetched } = useContext(appContext);
  const [numberLoaded, setNumberLoaded] = useState(12);
  const [modelsListeFiltered, setModelsListeFiltered] = useState([]);
  useEffect(() => {
    if (ModelsFetched.data?.data) {
      setModelsListeFiltered(ModelsFetched.data?.data);
    }
  }, [ModelsFetched]);
  const [selectedModels, setSelectedModels] = useState(null);
  const handleModelClick = (modelUrl) => {
    setSelectedModels(modelUrl);
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    const filtered = ModelsFetched.data?.data.filter((el) => {
      return el.name.toLowerCase().includes(value.toLowerCase());
    });
    setModelsListeFiltered(filtered);
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Select Models</DrawerHeader>

          <DrawerBody overflow={"auto"}>
            <Stack
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              height={"100%"}
              spacing="24px"
            >
              <Input
                onChange={handleSearch}
                placeholder="Search Models"
                autoFocus={false}
              />

              <Box
                w={"full"}
                maxH={"75%"}
                overflow={"auto"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={5}
              >
                {
                  //liste of models with line breaking
                  modelsListeFiltered.slice(0, numberLoaded).map((model) => {
                    let style = {
                      cursor: "pointer",
                      border: "3px solid purple",
                      boxShadow: "lg",
                      transform: "scale(1.2)",
                      transition: "all 0.2s ease-in-out",
                      filter: "brightness(1.1)",
                    };
                    let after = {
                      content: '"✔"',
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "2rem",
                      color: "purple",
                      borderRadius: "50%",
                      shadow: "0px 0px 10px 1px purple",
                    };
                    const url = parseToDirectusLink(model.preview);
                    return (
                      <motion.div key={model.id} layoutId={url}>
                        <Avatar
                          onClick={() => {
                            handleModelClick(url);
                          }}
                          name={model.name}
                          src={url}
                          size={"2xl"}
                          style={selectedModels === url ? style : null}
                          _after={selectedModels === url ? after : null}
                          transition={"all 0.3s"}
                          _hover={{
                            cursor: "pointer",
                            border: "2px solid purple",
                            boxShadow: "lg",
                            transform: "scale(1.1)",
                            transition: "all 0.2s ease-in-out",
                            filter: "brightness(0.9)",
                            _after: after,
                          }}
                        />
                      </motion.div>
                    );
                  })
                }
              </Box>

              <Button
                h={45}
                colorScheme="purple"
                onClick={() => {
                  setNumberLoaded((current) => current + 4);
                }}
              >
                Show More
              </Button>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                setProfilUrl(selectedModels);
                onClose();
              }}
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
