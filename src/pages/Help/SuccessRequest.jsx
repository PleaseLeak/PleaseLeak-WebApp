import React from "react";
import PageContainer from "../../components/layout/PageContainer";
import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
const SuccessRequest = () => {
  return (
    <PageContainer>
      <Box textAlign="center" py={10} px={6}>
        <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          request successfully sent
        </Heading>
        <Text color={"gray.500"}>
          Join our Telegram or Discord to be notified when it is processed. You
          can find the links at the bottom of the page
        </Text>
      </Box>
    </PageContainer>
  );
};

export default SuccessRequest;
