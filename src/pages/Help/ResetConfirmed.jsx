import PageContainer from "../../components/layout/PageContainer";

import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

export default function ResetConfirmed() {
  return (
    <PageContainer flexDirection={"column"}>
      <Box textAlign="center" py={10} px={6}>
        <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Email sent successful
        </Heading>
        <Text color={"gray.500"}>
          you have receive a email for reset your password, think check your
          mail
        </Text>
      </Box>
      <NavLink to="/sign-in">
        <Button colorScheme="purple">Sign In</Button>
      </NavLink>
    </PageContainer>
  );
}
