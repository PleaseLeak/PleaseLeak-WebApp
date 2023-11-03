import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { MdEmail, MdAdminPanelSettings, MdGirl } from "react-icons/md";
import { BsTelegram, BsDiscord } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PageContainer from "../../components/layout/PageContainer";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import "./Help.css";

export default function Help() {
  const params = useParams();
  const { currentUser } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [requestGirl, setRequestGirl] = useState(
    params.request === "girl" ? true : false
  );

  const toast = useToast();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }

    setLoading(true);
    const message = {
      message: `
      ---${currentUser.email}---
      ---${requestGirl ? "Girl Request" : "Bug Request"}---
      ${requestGirl ? "Onlyfans" : "Bug"} ${requestGirl ? "Link" : "Name"}: ${
        data.bugName
      }
      ${requestGirl ? "Girl" : "Bug"} Description: ${data.message}`,
    };
    fetch("https://telegram.please-leak.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        toast({
          title: "Message Sent.",
          description: "We've sent your message to the developer.",
          status: "success",
          colorScheme: "purple",
          duration: 9000,
          isClosable: true,
        });
      }
      setLoading(false);
      navigate("/request-success");
    });
  };

  const bugForm = (
    <>
      {" "}
      <FormControl id="name">
        <FormLabel>Bug Name</FormLabel>
        <InputGroup borderColor="#E0E1E7">
          <InputLeftElement pointerEvents="none">
            <MdAdminPanelSettings color="gray.800" />
          </InputLeftElement>
          <Input
            {...register("bugName", {
              required: true,
              maxLength: 20,
              minLength: 5,
              pattern: /^[A-Za-z]+$/i,
            })}
            type="text"
            size="md"
            required
          />
        </InputGroup>
      </FormControl>
    </>
  );

  const requestGirlForm = (
    <>
      <FormControl id="name">
        <FormLabel>Onlyfans Link</FormLabel>
        <InputGroup borderColor="#E0E1E7">
          <InputLeftElement pointerEvents="none">
            <MdGirl color="gray.800" />
          </InputLeftElement>
          <Input
            {...register("bugName", {
              required: true,
              maxLength: 20,
              minLength: 5,
              pattern: /^[A-Za-z]+$/i,
            })}
            type="text"
            size="md"
            required
          />
        </InputGroup>
      </FormControl>
    </>
  );

  return (
    <PageContainer p={5}>
      <Flex>
        <Box
          shadow={"dark-lg"}
          bg="#02054B"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box
            p={4}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <Box>
              <Heading>Assistance</Heading>
              <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                Fill up the form below to contact
              </Text>
              <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                <VStack pl={0} spacing={3} alignItems="center">
                  <a href="mailto:service@please-leak.com">
                    <Button
                      size="md"
                      height="48px"
                      w={"290px"}
                      variant="ghost"
                      color="#DCE2FF"
                      _hover={{ border: "2px solid #1C6FEB" }}
                      leftIcon={<MdEmail color="#1970F1" size="20px" />}
                    >
                      service@please-leak.com
                    </Button>
                  </a>
                  <Button
                    size="md"
                    height="48px"
                    w={"290px"}
                    colorScheme="purple"
                    onClick={() => {
                      setRequestGirl(requestGirl ? false : true);
                    }}
                  >
                    {requestGirl ? "Request Bug" : "Request Girl"}
                  </Button>
                </VStack>
              </Box>
              <Container px={5}>
                <a href="https://t.me/PleaseLeak">
                  <IconButton
                    aria-label="github"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    _hover={{ bg: "purple.600" }}
                    m={1}
                    icon={<BsTelegram color={"white"} size="28px" />}
                  />
                </a>
                <a href="https://discord.gg/EpeD6a6Y">
                  <IconButton
                    aria-label="discord"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    _hover={{ bg: "purple.600" }}
                    m={1}
                    icon={<BsDiscord color={"white"} size="28px" />}
                  />
                </a>
              </Container>
            </Box>
            <Box
              bg="white"
              className="request-form1"
              key={requestGirl + "key Form Request"}
              borderRadius="lg"
            >
              <Box m={8} color="#0B0E3F">
                <VStack spacing={5}>
                  {requestGirl ? requestGirlForm : bugForm}
                  <FormControl id="name">
                    <FormLabel>other info</FormLabel>
                    <Textarea
                      borderColor="gray.300"
                      _hover={{
                        borderRadius: "gray.300",
                      }}
                      placeholder="description"
                      w={"full"}
                      h={150}
                      resize={"none"}
                      {...register("message")}
                      required
                    />
                  </FormControl>
                  <Flex justifyContent={"center"} alignItems={"center"}>
                    <FormControl id="name" float="right">
                      <Button
                        w={120}
                        colorScheme="purple"
                        onClick={handleSubmit(onSubmit)}
                        disabled={loading}
                      >
                        {loading ? <Spinner /> : "Send"}
                      </Button>
                    </FormControl>
                  </Flex>
                  {errors.bugName && (
                    <Alert borderRadius={5} status="error">
                      <AlertIcon />
                      <AlertTitle>
                        {errors.bugName.type === "required"
                          ? "fields is required"
                          : errors.bugName.type === "maxLength"
                          ? "fields cannot exceed 20 characters"
                          : errors.bugName.type === "minLength"
                          ? "fields cannot be less than 5 characters"
                          : errors.bugName.type === "pattern"
                          ? "fields must contain only letters"
                          : ""}
                      </AlertTitle>
                    </Alert>
                  )}
                </VStack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </PageContainer>
  );
}
