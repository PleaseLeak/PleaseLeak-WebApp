import React from "react";
import { Box, useColorModeValue, Heading } from "@chakra-ui/react";
const StatsCard = ({ children, value, after }) => {
  return (
    <Box
      w={250}
      h={100}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={10}
      bg={useColorModeValue("gray.300", "gray.700")}
    >
      <Heading color={"purple.800"}>
        {value}
        {after}+&nbsp;
      </Heading>
      <Heading fontSize={30} color={"purple.700"}>
        {children}
      </Heading>
    </Box>
  );
};

export default StatsCard;
