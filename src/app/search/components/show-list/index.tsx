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
      {media.map((show, index) => (
        <ShowTile key={index} show={show} />
      ))}
    </SimpleGrid>
  );
};
