"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { ApolloWrapper } from "../apollo/apollo-wrapper";
import { NextAuthProvider } from "../auth";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider>
      <ApolloWrapper>
        <NextAuthProvider>{children}</NextAuthProvider>
      </ApolloWrapper>
    </ChakraProvider>
  );
};
