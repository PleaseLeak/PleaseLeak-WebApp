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
  Box,
  Flex,
  IconButton,
} from "@chakra-ui/react";
// trash icon
import { FaTrash } from "react-icons/fa";

import { useState } from "react";

export default function DrawerPromptSaved({
  isOpen,
  onClose,
  userPrompts,
  setPrompt,
  updatePromptSaved,
}) {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const handleRemove = (name) => {
    // create new array userPrompt without prompt with name
    const newPromptsArray = userPrompts.filter((p) => p.name !== name);
    // update userPrompts
    updatePromptSaved(newPromptsArray);
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
                  userPrompts.map((prompt) => {
                    let isSelected = selectedPrompt === prompt.name;
                    return (
                      <Flex py={1} gap={2} key={prompt.name}>
                        <Button
                          w={180}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedPrompt(null);
                            } else {
                              setSelectedPrompt(prompt.name);
                            }
                          }}
                          background={isSelected ? "purple" : "whitesmoke"}
                          color={isSelected ? "white" : "black"}
                          _hover={{
                            transform: "translateY(-2px)",
                            boxShadow: "lg",
                          }}
                        >
                          {prompt.name}
                        </Button>
                        <IconButton
                          bg={"purple"}
                          color={"white"}
                          rounded={"md"}
                          _hover={{
                            transform: "translateY(-2px)",
                            boxShadow: "lg",
                          }}
                          icon={<FaTrash />}
                          onClick={() => {
                            handleRemove(prompt.name);
                          }}
                        ></IconButton>
                      </Flex>
                    );
                  })
                }
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                if (selectedPrompt) {
                  const prompt = userPrompts.filter(
                    (p) => p.name === selectedPrompt
                  )[0];
                  setPrompt(prompt);
                } else {
                  setPrompt({
                    prompt: "",
                    negPrompt: "",
                    model: "model4",
                  });
                }
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
