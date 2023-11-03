/* eslint-disable react/prop-types */
import {
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
} from "@chakra-ui/react";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { motion } from "framer-motion";

const ConnectedMenu = () => {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error.message);
    }
  };
  const { currentUser } = useContext(userContext);

  return (
    <Menu zIndex={40}>
      {({ isOpen }) => (
        <>
          <MenuButton zIndex={11} rounded={"full"}>
            {!isOpen && (
              <motion.div
                style={{
                  border: "2px solid rgb(204, 204, 204) ",
                  borderRadius: "100%",
                }}
                layoutId="avatarProfileMenu"
              >
                <Avatar w={37} h={37} size={"sm"} src={currentUser.photoURL} />
              </motion.div>
            )}
            {isOpen && <div style={{ width: 43 }}></div>}
          </MenuButton>

          <MenuList zIndex={10} alignItems={"center"}>
            {isOpen && (
              <>
                <br />
                <Center>
                  <motion.div
                    style={{
                      border: "2px solid rgb(204, 204, 204) ",
                      borderRadius: "100%",
                    }}
                    layoutId="avatarProfileMenu"
                  >
                    <Avatar size={"2xl"} src={currentUser.photoURL} />
                  </motion.div>
                </Center>
                <br />
              </>
            )}

            <Center>
              <NavLink to={"/private/profile"}>
                <MenuItem background={"gray.100"} as={Button}>
                  Profile
                </MenuItem>
              </NavLink>
            </Center>
            <br />
            <MenuDivider />

            <NavLink to={"/private/favorites"}>
              <MenuItem>My Likes</MenuItem>
            </NavLink>
            <NavLink to={"/ai/saved"}>
              <MenuItem>Saved Ai Pictures</MenuItem>
            </NavLink>
            <NavLink to={"/settings"}>
              <MenuItem>Settings</MenuItem>
            </NavLink>
            <NavLink to={"/help"}>
              <MenuItem>Assistance</MenuItem>
            </NavLink>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

const NotConnectedMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar
          style={{
            border: "1px solid rgb(204, 204, 204) ",
          }}
          size={"sm"}
          src="https://bit.ly/broken-link"
        />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <NavLink to={"/settings"}>
          <MenuItem>Settings</MenuItem>
        </NavLink>

        <NavLink to={"/sign-in"}>
          <MenuItem>login</MenuItem>
        </NavLink>
        <NavLink to={"/sign-up"}>
          <MenuItem>Sign up</MenuItem>
        </NavLink>
        <NavLink to={"/help"}>
          <MenuItem>Assistance</MenuItem>
        </NavLink>
      </MenuList>
    </Menu>
  );
};

const ProfilMenu = () => {
  const { currentUser } = useContext(userContext);
  return (
    <Flex alignItems={"center"}>
      {currentUser ? <ConnectedMenu /> : <NotConnectedMenu />}
    </Flex>
  );
};

export default ProfilMenu;
