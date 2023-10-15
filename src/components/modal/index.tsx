import {
  Modal as ChakraModal,
  type ModalProps as ChakraModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  footerContent?: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  canClose?: boolean;
  heading?: string;
  size?: ChakraModalProps["size"];
};

export const Modal = ({
  children,
  isOpen,
  onClose,
  canClose = true,
  footerContent,
  heading,
  size,
}: ModalProps) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        {heading && <ModalHeader>{heading}</ModalHeader>}
        {canClose && <ModalCloseButton />}
        <Box>
          <ModalBody p={2}>{children}</ModalBody>
        </Box>
        {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
      </ModalContent>
    </ChakraModal>
  );
};
