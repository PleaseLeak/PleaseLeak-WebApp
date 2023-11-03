import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import StatsCard from "../../components/Card/StatsCard";
import { appContext } from "../../context/AppContext";
import { useContext } from "react";
const HomeStats = () => {
  const { ModelsFetched } = useContext(appContext);
  const size = ModelsFetched.data?.data.length;

  return (
    <Box
      mt={10}
      borderRadius={10}
      p={10}
      bg={useColorModeValue("gray.100", "gray.700")}
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
      gap={5}
    >
      <StatsCard value={size}>Models</StatsCard>
      <StatsCard after="To" value={Math.round(size / 30)}>
        Videos
      </StatsCard>
      <StatsCard after="To" value={Math.round(size / 38)}>
        Pictures
      </StatsCard>
    </Box>
  );
};

export default HomeStats;
