"use client";

import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  useDisclosure,
  useSteps,
  useToast,
} from "@chakra-ui/react";
import { Modal } from "@/components/modal";
import { Step, Stepper } from "@/components/stepper";
import { SearchResults } from "./components/search-results";
import { LoadingSpinner } from "@/components/loading-spinner";

const steps: Step[] = [
  { title: "Set username" },
  { title: "Choose job title" },
];

const SearchResultsPage = () => {
  const { status, data: sessionData, update: updateSession } = useSession();

  const { isOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const { activeStep, goToNext, goToPrevious, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });
  const toast = useToast();

  const [username, setUsername] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");

  const shouldUserOnboard = sessionData?.user
    ? !sessionData.user.hasCompletedOnboarding
    : false;

  const handleModalClose = () => {
    if (!shouldUserOnboard) {
      closeModal();
    }
  };

  useEffect(() => {
    if (shouldUserOnboard) {
      openModal();
    }
  }, [openModal, shouldUserOnboard]);

  const onboardingContent: ReactNode = useMemo(() => {
    const handleSubmitOnboarding = async () => {
      try {
        const response = await fetch("/api/users/update-user-details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, jobTitle }),
        });

        if (response.ok) {
          closeModal();
          updateSession();

          toast({
            title: "Details updated",
            description: "Your details have been updated successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          throw new Error("There was an issue updating your details.");
        }
      } catch (error) {
        toast({
          title: "An error occurred.",
          description: (error as Error).message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });

        setUsername("");
        setJobTitle("");
        setActiveStep(1);
      }
    };

    switch (activeStep) {
      case 1:
        return (
          <form
            id="username"
            onSubmit={(e) => {
              e.preventDefault();
              goToNext();
            }}
          >
            <Stack spacing={4}>
              <Text>Set your username to continue</Text>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FormControl>
              <HStack justifyContent="end" py={2}>
                <Button type="submit">Continue</Button>
              </HStack>
            </Stack>
          </form>
        );
      case 2:
        return (
          <form
            id="jobTitle"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitOnboarding();
            }}
          >
            <Stack spacing={4}>
              <Text size="lg">
                To complete registration, enter your job title
              </Text>
              <FormControl id="jobTitle">
                <FormLabel>Job Title</FormLabel>
                <Input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </FormControl>
              <HStack justifyContent="end" py={2}>
                <Button variant="ghost" onClick={goToPrevious}>
                  Back
                </Button>
                <Button type="submit">Complete</Button>
              </HStack>
            </Stack>
          </form>
        );
      default:
        return null;
    }
  }, [
    activeStep,
    closeModal,
    goToNext,
    goToPrevious,
    jobTitle,
    toast,
    username,
  ]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <>
      <SearchResults />
      <Modal
        heading="Complete your account"
        isOpen={isOpen}
        onClose={handleModalClose}
        canClose={!shouldUserOnboard}
      >
        <Box px={4}>
          <Stepper activeStep={activeStep} steps={steps} />
          <Box pt={4}>{onboardingContent}</Box>
        </Box>
      </Modal>
    </>
  );
};

export default SearchResultsPage;
