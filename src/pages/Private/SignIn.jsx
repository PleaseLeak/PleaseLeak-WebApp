import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { userContext } from "../../context/userContext";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function SignIn() {
  const { signInWithGoogle, signin } = useContext(userContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [isInSignIn, setIsInSignIn] = useState(false);
  const GoogleSignIn = async () => {
    try {
      setIsInSignIn(true);
      await signInWithGoogle();
      setIsInSignIn(false);
      toast({
        title: "Connected.",
        description: "You are connected.",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      navigate("/private/profile");
    } catch (error) {
      setIsInSignIn(false);
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const allInputs = useRef([]);
  const addInput = (el) => {
    if (el && !allInputs.current.includes(el)) {
      allInputs.current.push(el);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = allInputs.current[0].value;
    const password = allInputs.current[1].value;
    try {
      setIsInSignIn(true);
      await signin(email, password);
      setIsInSignIn(false);
      navigate("/private/profile");
    } catch (error) {
      setIsInSignIn(false);
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <PageContainer>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"purple.400"}>features</Link>{" "}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input ref={addInput} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input ref={addInput} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <NavLink to="/reset-password">
                  <Link color={"purple.400"}>Forgot password?</Link>
                </NavLink>
              </Stack>
              {isInSignIn ? (
                <Button
                  bg={"purple.400"}
                  _hover={{
                    bg: "purple.500",
                  }}
                  color={"white"}
                >
                  <Spinner />
                </Button>
              ) : (
                <Button
                  bg={"purple.400"}
                  color={"white"}
                  _hover={{
                    bg: "purple.500",
                  }}
                  onClick={handleSubmit}
                >
                  Sign in
                </Button>
              )}
              <Button
                onClick={GoogleSignIn}
                w={"full"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
              >
                <Center>
                  <Text>Sign in with Google</Text>
                </Center>
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don't have an account ?{" "}
                <NavLink to="/sign-up">
                  <Link color={"purple.400"}>Sign up</Link>
                </NavLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </PageContainer>
  );
}
