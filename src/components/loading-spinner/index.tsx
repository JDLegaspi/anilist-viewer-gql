import { Container, Spinner } from "@chakra-ui/react";

export const LoadingSpinner = () => {
  return (
    <Container
      maxW="container.xl"
      pt={8}
      pb={4}
      alignContent="center"
      justifyContent="center"
      display="flex"
      w="100%"
    >
      <Spinner thickness="4px" size="xl" />
    </Container>
  );
};
