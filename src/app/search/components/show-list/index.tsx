"use client";

import { SimpleGrid } from "@chakra-ui/react";
import { ShowTile } from "../show-tile";
import { Media } from "@/utils/data";

type ShowTileListProps = {
  media: Media[];
};

export const ShowTileList = ({ media }: ShowTileListProps) => {
  console.log({ media });
  return (
    <SimpleGrid columns={[1, 2, 3, 4, null]} spacing={8}>
      {media.map(({ averageScore, coverImage, title, popularity }, index) => (
        <ShowTile
          key={index}
          imageUrl={coverImage.large}
          titleRomaji={title.romaji}
          titleEnglish={title.english ?? undefined}
          averageScore={averageScore ?? undefined}
          popularity={popularity ?? undefined}
        />
      ))}
    </SimpleGrid>
  );
};
