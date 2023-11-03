import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Center,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { signInWithGoogle, signup } = useContext(userContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [isInSignUp, setIsInSignUp] = useState(false);
  const GoogleSignIn = async () => {
    try {
      setIsInSignUp(true);
      await signInWithGoogle();
      setIsInSignUp(false);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      navigate("/private/profile");
    } catch (error) {
      setIsInSignUp(false);
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
    const confirmPassword = allInputs.current[2].value;
    if (password !== confirmPassword && password.length < 6) {
      alert("passwords must match and be at least 6 characters long");
      return;
    }
    try {
      setIsInSignUp(true);
      await signup(email, password);
      setIsInSignUp(false);
      navigate("/private/profile");
    } catch (error) {
      setIsInSignUp(false);
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
      <Stack spacing={8} mx={"auto"} w={450} maxW={"2xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input ref={addInput} type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  ref={addInput}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password confirmation</FormLabel>
              <Input ref={addInput} type="password" />
            </FormControl>
            <Stack spacing={10} pt={2}>
              {isInSignUp ? (
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"purple.400"}
                  color={"white"}
                  _hover={{
                    bg: "purple.500",
                  }}
                >
                  <Spinner />
                </Button>
              ) : (
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"purple.400"}
                  color={"white"}
                  _hover={{
                    bg: "purple.500",
                  }}
                  onClick={handleSubmit}
                >
                  Sign up
                </Button>
              )}
              <Button
                onClick={GoogleSignIn}
                w={"full"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
              >
                <Center>
                  <Text>Sign up with Google</Text>
                </Center>
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <NavLink to="/sign-in">
                  <Link color={"purple.400"}>Login</Link>
                </NavLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </PageContainer>
  );
}
