import HomeFirstSection from "./HomeFirstSection";
import HomeHero from "./HomeHero";
import { Container, useDisclosure } from "@chakra-ui/react";
import HomeStats from "./HomeStats";
import { AlertTelegram } from "./AlertTelegram";
import { memo } from "react";
import { useEffect } from "react";

// memo react component defin display name
const Home = memo(function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const alertTelegram = localStorage.getItem("alertTelegram");
    if (alertTelegram === "false") {
      return;
    }
    onOpen();
  }, [onOpen]);
  const closeModal = () => {
    localStorage.setItem("alertTelegram", "false");
    onClose();
  };
  return (
    <>
      <AlertTelegram isOpen={isOpen} onClose={closeModal} />
      <video className="hero-video" src="main-video.mp4" muted loop autoPlay />

      <Container bg={"gray.300"} m={0} pb={10} maxW={"100vw"}>
        <HomeHero />
        <Container mt={{ base: -440, md: -600 }} mb={10} p={0} maxW={"4xl"}>
          <HomeStats />
        </Container>
        <Container p={0} maxW={"6xl"}>
          <HomeFirstSection />
        </Container>
      </Container>
    </>
  );
});

export default Home;
