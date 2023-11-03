import React from "react";
import { Card, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PicturesCard = ({ url, alt, link }) => {
  const navigate = useNavigate();

  return (
    <Card className="PicturesCard">
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
        _hover={{
          transform: "scale(1.1)",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/" + link);
        }}
      />
    </Card>
  );
};

export default PicturesCard;
