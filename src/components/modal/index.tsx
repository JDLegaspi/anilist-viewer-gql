import {
  Button,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  footerContent?: ReactNode;
  onClose: () => void;
  heading: string;
  isOpen: boolean;
  canClose?: boolean;
};

export const Modal = ({
  children,
  isOpen,
  onClose,
  canClose,
  footerContent,
  heading,
}: ModalProps) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{heading}</ModalHeader>
        {canClose ?? <ModalCloseButton />}
        <ModalBody>{children}</ModalBody>
        {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
      </ModalContent>
    </ChakraModal>
  );
};
