/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  Flex,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Heading,
  Tooltip,
  Divider,
} from "@chakra-ui/react";
import { useContext } from "react";
import { appContext } from "../../context/AppContext";
import { useState } from "react";
import { FormControl, Input } from "@chakra-ui/react";
import ListeModels from "./ListeModels";
import { useEffect } from "react";
import PageContainer from "../../components/layout/PageContainer";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { FaFilter } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { memo } from "react";
import ButtonSimple from "../../components/Button/ButtonSimple";
import { motion } from "framer-motion";

export default memo(function Models() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [filter, setFilter] = useState({
    isLastUpdate: false,
  });

  const params = useParams();
  const { ModelsFetched } = useContext(appContext);
  const [numberLoaded, setNumberLoaded] = useState(4);
  const [models, setModels] = useState(ModelsFetched.data?.data || []);

  const updateModelsList = (search) => {
    console.log(search);
    if (!ModelsFetched.data?.data) {
      setModels([]);
      return;
    }

    let newModelsList = !search
      ? ModelsFetched.data?.data
      : ModelsFetched.data?.data.filter((model) => {
          return model.name.toLowerCase().includes(search.toLowerCase());
        });

    if (filter.isLastUpdate) {
      newModelsList = [...newModelsList].reverse();
    }

    setModels(newModelsList);
  };

  const handleSearch = (e) => {
    setNumberLoaded(3);
    updateModelsList(e.target.value);
  };

  useEffect(() => {
    if (params.search) {
      updateModelsList(params.search);
    } else {
      updateModelsList(undefined);
    }
  }, [ModelsFetched, params.search]);

  const updateFilter = () => {
    setNumberLoaded(4);
    updateModelsList(undefined);
    onClose();
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Apply Filter</DrawerHeader>

          <DrawerBody>
            <Divider mb={4} />
            <Heading mb={2} size={"md"}>
              Order by
            </Heading>
            <RadioGroup
              onChange={(e) => {
                setFilter({ isLastUpdate: JSON.parse(e) });
              }}
              value={JSON.stringify(filter.isLastUpdate)}
            >
              <Stack direction="row">
                <Radio value={"false"}>First upload</Radio>
                <Radio value={"true"}>Last upload</Radio>
              </Stack>
            </RadioGroup>
          </DrawerBody>

          <DrawerFooter>
            <ButtonSimple mr={3} onClick={updateFilter}>
              Save
            </ButtonSimple>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <PageContainer flexDirection={"column"} justify={"flex-start"}>
        <Heading mt={5}>Onlyfans mega link</Heading> (stable)
        <Container
          mb={5}
          mt={5}
          spacing={4}
          as={Container}
          textAlign={"center"}
          display={"flex"}
          gap={5}
        >
          <FormControl>
            <Input
              onChange={handleSearch}
              type="text"
              placeholder="Search Models (without space)"
            />
          </FormControl>
          <Tooltip
            hasArrow
            label="Models Filter option"
            bg="gray.300"
            color="black"
          >
            <IconButton
              bg={"purple"}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              icon={<FaFilter />}
              onClick={onOpen}
            ></IconButton>
          </Tooltip>
        </Container>
        {models.length !== 0 ? (
          <ListeModels models={models} numberLoaded={numberLoaded} />
        ) : (
          <>
            <h1>Please write without space</h1>
            <NavLink to="/help/girl">
              <ButtonSimple width={180} my={5} colorScheme="purple">
                Request new girl
              </ButtonSimple>
            </NavLink>
          </>
        )}
        <Flex my={5} gap={5} justify="center">
          {numberLoaded < models.length && (
            <motion.div layoutId="loadMore">
              <ButtonSimple
                onClick={() => setNumberLoaded((current) => current + 4)}
              >
                Load more
              </ButtonSimple>
            </motion.div>
          )}
        </Flex>
      </PageContainer>
    </>
  );
});
