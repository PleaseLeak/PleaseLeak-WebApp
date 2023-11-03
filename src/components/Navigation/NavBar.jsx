/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  Button,
  Highlight,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import ProfilMenu from "./ProfilMenu";
import { NavLink } from "react-router-dom";

const Links = ["Home", "Models", "Ai", "Gallery"];

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box zIndex={10} bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex
          zIndex={10}
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            zIndex={20}
            size={"lg"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            maxHeight={"100%"}
            maxWidth={"100%"}
          />
          <HStack spacing={8} alignItems={"center"}>
            <NavLink to="/home">
              <Flex alignItems={"center"}>
                <Heading fontSize={30}>
                  <Highlight
                    query="Leak"
                    styles={{
                      color: "purple",
                    }}
                  >
                    Please Leak
                  </Highlight>
                </Heading>
                <span
                  style={{
                    marginLeft: 7,
                  }}
                >
                  (Beta)
                </span>
              </Flex>
            </NavLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink to={link.toLowerCase().replace(" ", "-")} key={link}>
                  <Button>{link}</Button>
                </NavLink>
              ))}
              {/* <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Pictures
                </MenuButton>
                <MenuList>
                  <NavLink to="/ass-pictures">
                    <MenuItem>Ass Pictures</MenuItem>
                  </NavLink>
                  <NavLink to="/pussy-pictures">
                    <MenuItem>Pussy Pictures</MenuItem>
                  </NavLink>
                  <NavLink to="/boobs-pictures">
                    <MenuItem>Boobs Pictures</MenuItem>
                  </NavLink>
                </MenuList>
              </Menu> */}
            </HStack>
          </HStack>
          <ProfilMenu />
        </Flex>

        {isOpen ? (
          <Box id="menu-mobile" pb={4} zIndex={10} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink onClick={onClose} to={link.toLowerCase()} key={link}>
                  <Button>{link}</Button>
                </NavLink>
              ))}
              {/* <Menu>
                <MenuButton zIndex={10} as={Button}>
                  Pictures
                </MenuButton>
                <MenuList zIndex={10}>
                  <NavLink onClick={onClose} to="/ass-pictures">
                    <MenuItem>Ass Pictures</MenuItem>
                  </NavLink>
                  <NavLink onClick={onClose} to="/pussy-pictures">
                    <MenuItem>Pussy Pictures</MenuItem>
                  </NavLink>
                  <NavLink onClick={onClose} to="/boobs-pictures">
                    <MenuItem>Boobs Pictures</MenuItem>
                  </NavLink>
                </MenuList>
              </Menu> */}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
