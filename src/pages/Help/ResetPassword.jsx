import React from "react";
import PageContainer from "../../components/layout/PageContainer";
import {
  Heading,
  Stack,
  useColorModeValue,
  FormControl,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const { sendEmailPasswordReset } = useContext(userContext);
  const email = useRef();
  const toast = useToast();
  const navigate = useNavigate();
  return (
    <PageContainer flexDirection={"column"}>
      <Heading>Reset your password</Heading>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <FormControl id="userName">
          <Input
            ref={email}
            placeholder="Email"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <Button
          colorScheme="purple"
          onClick={() => {
            sendEmailPasswordReset(email.current.value);
            toast({
              title: "Email sent",
              description: "check your email for reset your password ",
              colorScheme: "purple",
              status: "success",
              duration: 3000,
              position: "top",
              isClosable: true,
            });
            navigate("/reset-confirmed");
          }}
        >
          Send email
        </Button>
      </Stack>
    </PageContainer>
  );
};

export default ResetPassword;
