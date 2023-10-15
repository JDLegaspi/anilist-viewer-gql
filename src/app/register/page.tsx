"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    if (registering) return;

    e.preventDefault();

    setRegistering(true);

    try {
      const response = await fetch("/api/users/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (data.status === "error") {
        throw new Error(data.message);
      }

      // Sign in to the created account
      const success = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (success) {
        setSuccess(true);
        router.push("/search");

        toast({
          title: "Account created.",
          description:
            "You have successfully created and logged into your account.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error("There was an issue logging into the account.");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "There was a problem creating your account",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setRegistering(false);
    }
  };

  if (registering || success) {
    return (
      <Box>
        <LoadingSpinner />
        <Text textAlign="center">Registering your account!</Text>
      </Box>
    );
  }

  return (
    <Box width="full" maxWidth="md" mx="auto" mt="10">
      <Heading as="h1" size="xl" textAlign="center">
        Sign up
      </Heading>
      <Heading pt={8} as="h2" size="md" textAlign="center">
        To get started, sign up with a new email and password
      </Heading>
      <Box pt={8}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <Button type="submit">Register</Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterPage;
