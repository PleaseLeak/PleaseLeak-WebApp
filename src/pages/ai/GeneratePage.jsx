import React from "react";
import PageContainer from "../../components/layout/PageContainer";
import ButtonSimple from "../../components/Button/ButtonSimple";
import {
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Spinner,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { userContext } from "../../context/userContext";
import { getCreateAiImage, getStatusAiImage } from "../../utils/fetchs";
import ImageCard from "../../components/Card/ImageCard";
import { useContext } from "react";
import { ModalPromptSaved } from "./ModalPromptSave";
import DrawerPromptSaved from "./DrawerSavedPrompt";
const GeneratePage = () => {
  const { currentUser, userPrompts, updatePromptSaved } =
    useContext(userContext);
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [isLoading, setIsLoading] = useState({
    status: false,
    message: "",
    image: null,
  });
  const [allImages, setAllImages] = useState([]);

  const refs = {
    prompt: useRef(),
    negPrompt: useRef(),
    model: useRef(),
    character: useRef(),
    pose: useRef(),
    body: useRef(),
    hairColor: useRef(),
    outfit: useRef(),
    location: useRef(),
    haircut: useRef(),
    aspectRatio: useRef(),
  };

  const configShema = [
    {
      name: "Model",
      ref: refs.model,
      values: [
        {
          name: "3D Animation (disney)",
          value: "3d-animation",
        },
        {
          name: "General",
          value: "general",
        },
        {
          name: "Hentai",
          value: "anime",
        },

        {
          name: "Semi Realistic",
          value: "semi-realistic",
        },
      ],
    },
    {
      name: "Character",
      ref: refs.character,
      values: [
        {
          name: "Girl",
          value: "girl",
        },
        {
          name: "Woman",
          value: "woman",
        },
        {
          name: "Milf",
          value: "milf",
        },
        {
          name: "Cat Girl",
          value: "catgirl",
        },
      ],
    },
    {
      name: "Pose / View",
      ref: refs.pose,
      values: [
        {
          name: "Self Boob Grab",
          value: "self boob grab",
        },
        {
          name: "General",
          value: "general",
        },
        {
          name: "Fingering",
          value: "fingering",
        },
        {
          name: "Front Pussy",
          value: "front pussy",
        },
        {
          name: "tits",
          value: "tits",
        },
        {
          name: "Butt",
          value: "butt",
        },
        {
          name: "Missionary",
          value: "missionary",
        },
        {
          name: "Licking Penis",
          value: "licking penis",
        },
        {
          name: "Back Pussy",
          value: "back pussy",
        },
        {
          name: "Standing",
          value: "standing",
        },
        {
          name: "Kneeling",
          value: "kneeling",
        },
        {
          name: "Table Humping",
          value: "table humping",
        },
      ],
    },
    {
      name: "Body Type",
      ref: refs.body,
      values: [
        {
          name: "Curvy",
          value: "curvy",
        },
        {
          name: "Skinny",
          value: "skinny",
        },
        {
          name: "Huge Tits",
          value: "hige tits",
        },
        {
          name: "Hourglass",
          value: "hourglass",
        },
        {
          name: "Normal",
          value: "normal",
        },
      ],
    },
    {
      name: "Hair Color",
      ref: refs.hairColor,
      values: [
        {
          name: "Blonde",
          value: "blonde",
        },
        {
          name: "Brunette",
          value: "brunette",
        },
        {
          name: "Redhead",
          value: "redhead",
        },
        {
          name: "Brown",
          value: "brown",
        },
        {
          name: "Pink",
          value: "pink",
        },
        {
          name: "Silver",
          value: "silver",
        },
        {
          name: "Purple",
          value: "hair purple",
        },
        {
          name: "Blue",
          value: "blue",
        },
        {
          name: "Black",
          value: "black",
        },
      ],
    },
    {
      name: "Outfit",
      ref: refs.outfit,
      values: [
        {
          name: "PantyHose",
          value: "PantyHose",
        },
        {
          name: "Nude",
          value: "nude",
        },
        {
          name: "Bikini",
          value: "bikini",
        },
        {
          name: "Lingerie",
          value: "lingerie",
        },

        {
          name: "Corset",
          value: "corset",
        },
        {
          name: "Panties",
          value: "panties",
        },
        {
          name: "Stockings",
          value: "stockings",
        },
        {
          name: "Bra",
          value: "bra",
        },
        {
          name: "Topless",
          value: "topless",
        },
        {
          name: "Swimsuit",
          value: "swimsuit",
        },
        {
          name: "School Uniform",
          value: "school uniform",
        },
        {
          name: "Maid",
          value: "maid",
        },
        {
          name: "Cheerleader",
          value: "cheerleader",
        },
        {
          name: "Nurse",
          value: "nurse",
        },
        {
          name: "Police",
          value: "police",
        },

        {
          name: "Cat",
          value: "cat",
        },
        {
          name: "Dog",
          value: "dog",
        },
        {
          name: "Fox",
          value: "fox",
        },
        {
          name: "Wolf",
          value: "wolf",
        },
        {
          name: "Dragon",
          value: "dragon",
        },
        {
          name: "Cow",
          value: "cow",
        },
        {
          name: "Horse",
          value: "horse",
        },
        {
          name: "Bunny",
          value: "bunny",
        },
        {
          name: "Pajamas",
          value: "pajamas",
        },
        {
          name: "Kimono",
          value: "kimono",
        },
        {
          name: "Dress",
          value: "dress",
        },
        {
          name: "Skirt",
          value: "skirt",
        },
        {
          name: "Sexy",
          value: "sexy",
        },
        {
          name: "Casual",
          value: "casual",
        },
        {
          name: "Cameltoe",
          value: "cameltoe",
        },
      ],
    },
    {
      name: "Location",
      ref: refs.location,
      values: [
        {
          name: "BedRoom",
          value: "bedroom",
        },
        {
          name: "Beach",
          value: "beach",
        },

        {
          name: "Classroom",
          value: "classroom",
        },
        {
          name: "Office",
          value: "office",
        },
        {
          name: "Kitchen",
          value: "kitchen",
        },
        {
          name: "Bathroom",
          value: "bathroom",
        },
        {
          name: "Living Room",
          value: "living room",
        },
        {
          name: "Dungeon",
          value: "dungeon",
        },
        {
          name: "Forest",
          value: "forest",
        },
        {
          name: "Cave",
          value: "cave",
        },
        {
          name: "Street",
          value: "street",
        },
        {
          name: "Castle",
          value: "castle",
        },
        {
          name: "Garden",
          value: "garden",
        },

        {
          name: "Hotel",
          value: "hotel",
        },
        {
          name: "Bar",
          value: "bar",
        },
        {
          name: "Restaurant",
          value: "restaurant",
        },

        {
          name: "Pool",
          value: "pool",
        },
        {
          name: "Spa",
          value: "spa",
        },
        {
          name: "Sauna",
          value: "sauna",
        },
        {
          name: "Gym",
          value: "gym",
        },
        {
          name: "Hospital",
          value: "hospital",
        },
      ],
    },
    {
      name: "Haircut",
      ref: refs.haircut,
      values: [
        {
          name: "Long",
          value: "long",
        },
        {
          name: "Curly",
          value: "curly",
        },
        {
          name: "Ponytail",
          value: "ponytail",
        },

        {
          name: "Short",
          value: "short",
        },
        {
          name: "Braided",
          value: "braided",
        },
        {
          name: "Pigtails",
          value: "pigtails",
        },
        {
          name: "Twin Tails",
          value: "twin tails",
        },
        {
          name: "Bun",
          value: "bun",
        },
        {
          name: "Bob",
          value: "bob",
        },
        {
          name: "Sidecut",
          value: "sidecut",
        },
        {
          name: "Mohawk",
          value: "mohawk",
        },
        {
          name: "Shaved",
          value: "shaved",
        },

        {
          name: "Twintails",
          value: "twintails",
        },
        {
          name: "Afro",
          value: "afro",
        },
        {
          name: "Braids",
          value: "braids",
        },
        {
          name: "Bangs",
          value: "bangs",
        },
        {
          name: "Spiky",
          value: "spiky",
        },
      ],
    },
    {
      name: "Aspect Ratio",
      ref: refs.aspectRatio,
      values: [
        {
          name: "2:3",
          value: "2:3",
        },
        {
          name: "1:1",
          value: "1:1",
        },

        {
          name: "3:2",
          value: "3:2",
        },
      ],
    },
  ];

  const toast = useToast();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  const getPromptConfig = () => ({
    prompt: refs.prompt.current.value,
    negativePrompt: refs.negPrompt.current.value,
    option: {
      character: refs.character.current.value,
      outfit: refs.outfit.current.value,
      haircolo: refs.hairColor.current.value,
      view: refs.pose.current.value,
      location: refs.location.current.value,
      haircut: refs.haircut.current.value,
      aspectRatio: refs.aspectRatio.current.value,
    },
    aiModel: refs.model.current.value,
  });

  const generateImage = async () => {
    setIsLoading({ status: true, message: "Wait..." });
    const config = getPromptConfig();
    const aiImageId = await getCreateAiImage(config);

    let status = await getStatusAiImage(aiImageId.id);
    while (status.status !== "COMPLETED") {
      status = await getStatusAiImage(aiImageId.id);
      setIsLoading({ status: true, message: status.status });
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    setAllImages((prev) => [...prev, status.id]);
    setIsLoading({ status: false, message: "" });
  };

  const handleSubmit = async () => {
    setIsLoading({ status: true, message: "Wait..." });
    for (let i = 0; i < numberOfImages; i++) {
      await generateImage(); // Wait for each image to be generated
    }
  };

  const handlePromptSaved = async (name) => {
    const isExist = userPrompts.some((p) => p.name === name);
    if (isExist) {
      toast({
        title: "Error.",
        description: "Prompt name already exist",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newPromptsArray = [...userPrompts, { name, ...getPromptConfig() }];
    updatePromptSaved(newPromptsArray);
  };

  const setPrompt = (prompt) => {
    refs.prompt.current.value = prompt.prompt;
    refs.negPrompt.current.value = prompt.negPrompt;
    refs.model.current.value = prompt.model;
    refs.character.current.value = prompt.option.character;
    refs.outfit.current.value = prompt.option.outfit;
    refs.hairColor.current.value = prompt.option.haircolo;
    refs.pose.current.value = prompt.option.view;
    refs.location.current.value = prompt.option.location;
    refs.haircut.current.value = prompt.option.haircut;
  };

  return (
    <PageContainer p={4} flexDirection={"column"}>
      <DrawerPromptSaved
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
        userPrompts={userPrompts}
        setPrompt={setPrompt}
        updatePromptSaved={updatePromptSaved}
      />
      <ModalPromptSaved
        handlePromptSaved={handlePromptSaved}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
      <Heading>Generate NSFW </Heading>
      (Beta)
      <Flex mt={4} gap={5} direction={"column"}>
        <Flex gap={3}>
          <FormControl>
            <FormLabel>Prompt</FormLabel>
            <Textarea ref={refs.prompt} />
          </FormControl>
          <FormControl>
            <FormLabel>Negative Prompt</FormLabel>
            <Textarea ref={refs.negPrompt} />
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel>Number of images: {numberOfImages}</FormLabel>
          <Slider
            min={1}
            max={3}
            value={numberOfImages}
            onChange={setNumberOfImages}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>
        <Flex justifyContent={"center"} gap={3} wrap={"wrap"}>
          {configShema.map((config) => {
            return (
              <FormControl w={"150px"} key={config.name}>
                <FormLabel>{config.name}</FormLabel>
                <Select ref={config.ref}>
                  {config.values.map((value) => (
                    <option key={value.name} value={value.value}>
                      {value.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            );
          })}
        </Flex>
      </Flex>
      <Flex
        wrap={"wrap"}
        width={"100vw"}
        gap={5}
        m={3}
        justifyContent={"center"}
      >
        {allImages.map((image) => (
          <ImageCard
            isLiked={false}
            isBlur={currentUser ? true : false}
            key={image}
            id={image}
          />
        ))}
      </Flex>
      <Flex
        wrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={5}
      >
        <ButtonSimple
          isDisabled={isLoading.status ? true : false}
          style={{
            width: isLoading.status ? 180 : null,
            transition: "all 0.2s",
          }}
          mb={3}
          onClick={handleSubmit}
        >
          {isLoading.status ? (
            <>
              <Spinner mr={2} />
              <span>{isLoading.message}</span>
            </>
          ) : (
            "Generate"
          )}
        </ButtonSimple>
        <ButtonSimple
          mb={3}
          onClick={() => {
            setAllImages([]);
          }}
        >
          Clear
        </ButtonSimple>
      </Flex>
      <Flex justifyContent={"center"} gap={5}>
        <ButtonSimple width={150} mb={3} onClick={onModalOpen}>
          Save Prompt
        </ButtonSimple>
        <ButtonSimple onClick={onDrawerOpen} width={150} mb={3}>
          Load Prompt
        </ButtonSimple>
      </Flex>
    </PageContainer>
  );
};

export default GeneratePage;
