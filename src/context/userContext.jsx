/* eslint-disable react/prop-types */
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { auth, db, provider } from "../../firebase-config";
import { useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import LoaderPage from "../components/Loader/LoaderPage";
import React from "react";
export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [userLikes, setUserLikes] = useState([]);
  const [userPrompts, setUserPrompts] = useState([]);
  const [userAiPicture, setUserAiPicture] = useState([]);

  const [loadingData, setLoadingData] = useState(true);
  const toast = useToast();

  const userCreated = async (user) => {
    if (user) {
      const usersRef = doc(db, "users", user.email);
      const docSnap = await getDoc(usersRef);

      if (!docSnap.exists()) {
        await setDoc(usersRef, {
          likes: [],
        });
      }
    }
  };

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
      userCreated(res.user);
      return res;
    });

  const signin = (email, password) =>
    signInWithEmailAndPassword(auth, email, password).then((res) => {
      userCreated(res.user);
      return res;
    });

  const signInWithGoogle = () =>
    signInWithPopup(auth, provider).then((res) => {
      userCreated(res.user);
      return res;
    });

  const updateLikes = async (res) => {
    const docRef = doc(db, "users", currentUser.email);
    await updateDoc(docRef, {
      likes: res,
    });
    setUserLikes(res);
  };

  const getLikes = async () => {
    const docRef = doc(db, "users", currentUser.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().likes) {
      return docSnap.data().likes;
    } else {
      // doc.data() will be undefined in this case
    }
  };

  const getAiPictures = async () => {
    const docRef = doc(db, "users", currentUser.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().aiPictures) {
      return docSnap.data().aiPictures;
    }
  };

  const updateAiPictures = async (res) => {
    console.log(res);
    const docRef = doc(db, "users", currentUser.email);
    await updateDoc(docRef, {
      aiPictures: res,
    });
    setUserAiPicture(res);
  };

  const updatePromptSaved = async (prompts) => {
    const docRef = doc(db, "users", currentUser.email);
    await updateDoc(docRef, {
      prompts: prompts,
    });
    setUserPrompts(prompts);
    toast({
      title: "Success.",
      description: "Prompts Updated.",
      status: "success",
      position: "top",
      duration: 9000,
      isClosable: true,
      colorScheme: "purple",
    });
  };

  const getPromptSaved = async () => {
    const docRef = doc(db, "users", currentUser.email);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    if (docSnap.exists() && docSnap.data().prompts) {
      return docSnap.data().prompts;
    } else {
      return [];
    }
  };

  const updateUserInfo = async (res) => {
    try {
      await updateProfile(currentUser, res);

      setCurrentUser({
        ...currentUser,
        displayName: res.displayName
          ? res.displayName
          : currentUser.displayName,
        photoURL: res.photoURL ? res.photoURL : currentUser.photoURL,
      });

      toast({
        title: "Success.",
        description: "Your profile has been updated.",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
        colorScheme: "purple",
      });
    } catch (error) {
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const sendEmailPasswordReset = async (email) =>
    sendPasswordResetEmail(auth, email).then(() => {
      return true;
    });
  const updateUserEmail = async (res) => {
    try {
      await updateEmail(auth.currentUser, res);
      toast({
        title: "Success.",
        description: "Your email has been updated.",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
        colorScheme: "purple",
      });
    } catch (error) {
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const updateUserPassword = async (res) => {
    try {
      await updatePassword(auth.currentUser, res);
      toast({
        title: "Success.",
        description: "Your password has been updated.",
        status: "success",
        position: "top",
        duration: 2000,
        isClosable: true,
        colorScheme: "purple",
      });
    } catch (error) {
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (currentUser) {
      getLikes().then((res) => {
        setUserLikes(res);
      });
      getPromptSaved().then((res) => {
        setUserPrompts(res);
      });
      getAiPictures().then((res) => {
        if (!res) {
          setUserAiPicture([]);
        } else {
          setUserAiPicture(res);
        }
      });
    }
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      setLoadingData(false);
    });
    return unsubscribe;
  }, []);

  return (
    <userContext.Provider
      value={{
        currentUser,
        signup,
        signin,
        signInWithGoogle,
        updateLikes,
        userLikes,
        updateUserInfo,
        updateUserEmail,
        updateUserPassword,
        sendEmailPasswordReset,
        userPrompts,
        updatePromptSaved,
        userAiPicture,
        updateAiPictures,
      }}
    >
      {loadingData ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <LoaderPage />
        </div>
      ) : (
        children
      )}
    </userContext.Provider>
  );
};
