import { useState } from "react";
import PageContainer from "../../components/layout/PageContainer";
import {
  Box,
  useRadio,
  HStack,
  useRadioGroup,
  Heading,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import ButtonSimple from "../../components/Button/ButtonSimple";
import { useContext } from "react";
import { appContext } from "../../context/AppContext";

const RadioCard = (props) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: useColorModeValue("purple", "gray.900"),
          color: "white",
          borderColor: useColorModeValue("purple", "gray.900"),
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

function Settings() {
  const toast = useToast();
  const { settings, setSettings } = useContext(appContext);

  const imageQualityOptions = ["low", "medium", "high"];

  const [newSettings, setNewSettings] = useState(settings);

  const {
    getRootProps: getPicturesQuality,
    getRadioProps: getPicturesQualityProps,
  } = useRadioGroup({
    name: "picturesQuality",
    defaultValue: newSettings.picturesQuality,
    onChange: (value) =>
      setNewSettings({ ...newSettings, picturesQuality: value }),
  });

  const groupProfil = getPicturesQuality();

  const {
    getRootProps: getBannerQuality,
    getRadioProps: getBannerQualityProps,
  } = useRadioGroup({
    name: "bannerQuality",
    defaultValue: newSettings.bannerQuality,
    onChange: (value) =>
      setNewSettings({ ...newSettings, bannerQuality: value }),
  });

  const groupBanner = getBannerQuality();

  const handleSave = () => {
    setSettings(newSettings);
    toast({
      title: "Settings saved",
      description: "Your settings have been saved",
      colorScheme: "purple",
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };
  return (
    <PageContainer flexDirection={"column"} gap={4}>
      <Heading>Settings</Heading>
      <Heading fontSize={"1.6em"}>Picture Quality</Heading>
      <HStack {...groupProfil}>
        {imageQualityOptions.map((value) => {
          const radio = getPicturesQualityProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>
      <Heading fontSize={"1.6em"}>Banner Quality</Heading>

      <HStack {...groupBanner}>
        {imageQualityOptions.map((value) => {
          const radio = getBannerQualityProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>
      <ButtonSimple onClick={handleSave}>Save</ButtonSimple>
    </PageContainer>
  );
}

export default Settings;
