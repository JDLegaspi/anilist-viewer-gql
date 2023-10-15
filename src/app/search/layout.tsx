"use client";

import {
  Button,
  HStack,
  Text,
  Box,
  Heading,
  Container,
  Badge,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: sessionData } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  return (
    <Container maxW="container.xl" pb={12}>
      <HStack justifyContent="space-between" p={4}>
        <Heading as="h1" size="lg" textAlign="center">
          AniTrack
        </Heading>
        <Box>
          {sessionData?.user && (
            <HStack spacing={8}>
              {sessionData.user.username && (
                <Text>
                  Hi,{" "}
                  <Text fontWeight="bold" as="span">
                    {sessionData.user.username}
                  </Text>
                </Text>
              )}
              {sessionData.user.jobTitle && (
                <Badge borderRadius="full" colorScheme="teal" px={3}>
                  {sessionData.user.jobTitle}
                </Badge>
              )}
              <Button onClick={() => signOut()} mr={2}>
                Sign Out
              </Button>
            </HStack>
          )}
        </Box>
      </HStack>
      {children}
    </Container>
  );
}
