"use client";

import {
  Text,
  HStack,
  Link,
  Stack,
  Heading,
  Container,
  Box,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function Home() {
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // prevent spam clicking sign in button
    if (loggingIn) return;

    setLoggingIn(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res && !res.error) {
        router.push("/search");

        toast({
          title: "Logged in successfully.",
          description: "You have successfully  logged into your account.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error(
          "Your login credentials were incorrect. Please try again or create an account to continue."
        );
      }
    } catch (error) {
      toast({
        title: "Login failed.",
        description: (error as Error).message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoggingIn(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") redirect("/search");
  }, [status]);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      {status === "loading" || loggingIn ? (
        <LoadingSpinner />
      ) : (
        <Container maxW="lg">
          <Stack>
            <Heading as="h1" size="4xl" textAlign="center">
              AniTrack
            </Heading>
            <Heading pt={8} as="h2" size="lg" textAlign="center">
              Discover and Explore new experiences with Our GraphQL-Powered
              NextJS App!
            </Heading>
            <Box pt={20}>
              <Heading fontWeight="bold" size="md" pb={4}>
                Sign in to get started
              </Heading>
              <form onSubmit={handleSubmit}>
                <Stack spacing={6}>
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
                  <Button width="100%" type="submit">
                    Sign in
                  </Button>
                </Stack>
              </form>
              <Text textAlign="center" py={2}>
                Or
              </Text>
              <HStack justifyContent="center" width="100%">
                <Link href="/register" color="teal.500" mr={2}>
                  Register
                </Link>
              </HStack>
            </Box>
          </Stack>
        </Container>
      )}
    </main>
  );
}
