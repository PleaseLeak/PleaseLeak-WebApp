import React from "react";
import { Card, Image } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
const VideosCard = ({ url, alt }) => {
  return (
    <Card
      className="PicturesCard"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      fontSize={50}
      color={"white"}
      transition={"all 0.3s"}
      boxShadow={"dark-lg"}
      filter="brightness(0.9)"
      _hover={{
        filter: "brightness(1.2)",
        transform: "scale(1.2)",
        cursor: "pointer",
      }}
      m={1}
    >
      <Image
        fit={"cover"}
        src={url}
        w={"220px"}
        height={"280px"}
        borderRadius={5}
        alt={alt}
        style={{
          transition: "all 0.3s",
        }}
      />
      <BsFillPlayFill
        style={{
          position: "absolute",
        }}
      />
    </Card>
  );
};

export default VideosCard;
