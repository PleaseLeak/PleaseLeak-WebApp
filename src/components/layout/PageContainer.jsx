/* eslint-disable react/prop-types */
import { Flex, useColorModeValue } from "@chakra-ui/react";
const PageContainer = ({
  children,
  flexDirection,
  justify,
  bg,
  p,
  gap,
  addClass,
  display,
}) => {
  const defaultBg = useColorModeValue("#F9FAFB", "#171923");
  const bgValue = bg ? bg : defaultBg;
  return (
    <Flex
      minH={"86.7vh"}
      align={"center"}
      justify={justify ? justify : "center"}
      flexDirection={flexDirection ? flexDirection : "initial"}
      bg={bgValue}
      p={p ? p : 0}
      gap={gap ? gap : 0}
      className={"PageContainer " + addClass}
      display={display ? display : "flex"}
    >
      {children}
    </Flex>
  );
};

export default PageContainer;
