"use client";

import { Modal } from "@/components/modal";
import { Media } from "@/utils/data";
import {
  VStack,
  Badge,
  Image,
  Box,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";

type ShowTileProps = {
  show: Media;
};

export const ShowTile = ({
  show: {
    title: { english: titleEnglish, romaji: titleRomaji },
    coverImage: { large: imageUrl },
    averageScore,
    popularity,
    description,
    startDate: { year: startYear, month: startMonth, day: startDay },
  },
}: ShowTileProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleShowTileClick = () => {
    setIsModalOpen(true);
  };

  const showTitle = titleEnglish || titleRomaji || "-";

  const badges = (
    <>
      <Badge borderRadius="full" colorScheme="teal" px={3}>
        Score: {averageScore || "N/A"}
      </Badge>
      <Badge borderRadius="full" colorScheme="purple" px={3}>
        Popularity: {popularity || "N/A"}
      </Badge>
    </>
  );

  return (
    <>
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
        onClick={handleShowTileClick}
      >
        <Image
          src={imageUrl}
          alt={`${showTitle} banner`}
          height={350}
          width="100%"
          objectFit="cover"
        />
        <VStack p={4} align="start">
          {badges}
          <Text fontWeight="bold" fontSize="xl">
            {showTitle}
          </Text>
        </VStack>
      </Box>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="5xl"
      >
        <HStack p={2} spacing={10} align="start">
          <Image
            src={imageUrl}
            alt={`${showTitle} banner`}
            height={500}
            width="100%"
          />
          <VStack spacing={3} align="start">
            <Text fontWeight="bold" fontSize="2xl">
              {showTitle}
            </Text>
            <HStack>{badges}</HStack>
            {description && (
              <Text dangerouslySetInnerHTML={{ __html: description }} />
            )}
            <Text>
              Start Date: {startYear || "N/A"}-{startMonth || "N/A"}-
              {startDay || "N/A"}
            </Text>
          </VStack>
        </HStack>
      </Modal>
    </>
  );
};
