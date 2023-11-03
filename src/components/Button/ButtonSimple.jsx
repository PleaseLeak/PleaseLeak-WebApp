/* eslint-disable react/prop-types */
import { Button, useColorModeValue } from "@chakra-ui/react";

const ButtonSimple = ({
  children,
  onClick,
  isIcon,
  mt,
  width,
  mb,
  style,
  isDisabled,
}) => {
  return (
    <Button
      isDisabled={isDisabled}
      style={style}
      mb={mb}
      mt={mt}
      onClick={onClick}
      w={width ? width : isIcon ? "40px" : "120px"}
      h={"40px"}
      bg={useColorModeValue("purple", "gray.900")}
      color={"white"}
      rounded={"md"}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonSimple;
