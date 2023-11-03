import { useRef } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
// component alert for call to join telegram channel for get notified and more content
export function AlertTelegram({ onClose, isOpen }) {
  const cancelRef = useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Join our Telegram channel</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <p>
              {/*
              good texte for call action with emoji
              */}
              <span role="img" aria-label="emoji">
                👋
              </span>{" "}
              Join our Telegram channel to get notified when we release new
              content and to get access to exclusive content.
              <br />
            </p>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              as="a"
              href="https://t.me/pleaseleak"
              target="_blank"
              colorScheme="blue"
              ref={cancelRef}
              onClick={onClose}
            >
              Join
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
