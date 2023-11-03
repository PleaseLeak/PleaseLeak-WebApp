import React from "react";
import PageContainer from "../../components/layout/PageContainer";
import { appContext } from "../../context/AppContext";
import { Image } from "@chakra-ui/react";
import { downloadFile } from "../../utils/tools";
import "./Carroussel.css";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useRef, useEffect, useState, useContext } from "react";
import ButtonSimple from "../../components/Button/ButtonSimple";

const Carroussel = () => {
  const { GalleryFetched } = useContext(appContext);
  const [selectedPicture, setSelectedPicture] = useState(0);

  const imageRef = useRef();

  useEffect(() => {
    // Assurez-vous que les données de la galerie ont été chargées avec succès
    if (GalleryFetched.isSuccess && GalleryFetched.data.length > 0) {
      // Précharger les deux images suivantes si elles existent
      for (let i = 1; i <= 2; i++) {
        if (selectedPicture + i < GalleryFetched.data.length) {
          const image = new window.Image();
          image.src =
            "https://ai-secret.please-leak.com/uploads/" +
            GalleryFetched.data[selectedPicture + i];
        }
      }
    }
  }, [selectedPicture, GalleryFetched]);

  useEffect(() => {
    // on keyboard right arrow go to next image
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        imageRef.current.classList.remove("carroussel-image-left");
        imageRef.current.classList.remove("carroussel-image");

        void imageRef.current.offsetWidth;
        imageRef.current.className = "carroussel-image";
        if (selectedPicture < GalleryFetched.data.length - 1) {
          setSelectedPicture((current) => current + 1);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    const handleKeyDownLeft = (e) => {
      if (e.key === "ArrowLeft") {
        imageRef.current.classList.remove("carroussel-image");
        imageRef.current.classList.remove("carroussel-image-left");

        void imageRef.current.offsetWidth;
        imageRef.current.className = "carroussel-image-left";
        console.log(selectedPicture);
        if (selectedPicture != 0) {
          setSelectedPicture((current) => current - 1);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDownLeft);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleKeyDownLeft);
    };
  }, [GalleryFetched, selectedPicture]);

  return (
    <PageContainer p={5} flexDirection={"column"} addClass={"carroussel"}>
      {GalleryFetched.data && (
        <Image
          mb={5}
          ref={imageRef}
          className="carroussel-image"
          minHeight={"65vh"}
          minWidth={200}
          maxWidth={"98vw"}
          maxHeight={"85vh"}
          objectFit={"cover"}
          src={
            "https://ai-secret.please-leak.com/uploads/" +
            GalleryFetched.data[selectedPicture]
          }
          zIndex={0}
        />
      )}

      <ButtonSimple
        onClick={() => {
          downloadFile(
            "https://ai-secret.please-leak.com/uploads/" +
              GalleryFetched.data[selectedPicture],
            "wallpaper.png"
          );
        }}
        mt={5}
      >
        Download
      </ButtonSimple>

      <div
        className="control"
        style={{
          zIndex: 0,
        }}
      >
        <div
          className="left-button"
          onClick={() => {
            imageRef.current.classList.remove("carroussel-image");
            imageRef.current.classList.remove("carroussel-image-left");

            void imageRef.current.offsetWidth;
            imageRef.current.className = "carroussel-image-left";

            if (selectedPicture > 0) {
              setSelectedPicture((current) => current - 1);
            }
          }}
        >
          <BsFillArrowLeftCircleFill />
        </div>
        <div
          className="right-button"
          onClick={() => {
            imageRef.current.classList.remove("carroussel-image-left");
            imageRef.current.classList.remove("carroussel-image");

            void imageRef.current.offsetWidth;
            imageRef.current.className = "carroussel-image";

            if (selectedPicture < GalleryFetched.data.length - 1) {
              setSelectedPicture((current) => current + 1);
            }
          }}
        >
          <BsFillArrowRightCircleFill />
        </div>
      </div>
    </PageContainer>
  );
};

export default Carroussel;
