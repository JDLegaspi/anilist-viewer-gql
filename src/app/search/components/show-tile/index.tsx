"use client";

import { VStack, Badge, Image, Box, Text, Button } from "@chakra-ui/react";

type ShowTileProps = {
  imageUrl: string;
  titleRomaji: string;
  titleEnglish?: string;
  averageScore?: number;
  popularity?: number;
};

export const ShowTile = ({
  imageUrl,
  titleEnglish,
  titleRomaji,
  averageScore,
  popularity,
}: ShowTileProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition={"all 0.2s ease-in-out"}
      _hover={{
        cursor: "pointer",
        boxShadow: "lg",
      }}
      _active={{
        transform: "scale(0.95)",
      }}
    >
      <Image
        src={imageUrl}
        alt={`${titleEnglish || titleRomaji} banner`}
        height={350}
        width="100%"
        objectFit="cover"
      />
      <VStack p={4} align="start">
        <Badge borderRadius="full" colorScheme="teal" px={3}>
          Score: {averageScore || "N/A"}
        </Badge>
        <Badge borderRadius="full" colorScheme="purple" px={3}>
          Popularity: {popularity || "N/A"}
        </Badge>
        <Text fontWeight="bold" fontSize="xl">
          {titleEnglish || titleRomaji || "-"}
        </Text>
      </VStack>
    </Box>
  );
};
