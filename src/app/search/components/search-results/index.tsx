"use client";

import { SearchFilter } from "@/app/search/components/search-filter";
import { ShowTileList } from "@/app/search/components/show-list";
import { useGetData } from "@/utils/data";
import { Container } from "@chakra-ui/react";
import { useState } from "react";

export const SearchResults = () => {
  const [search, setSearch] = useState<string>();
  const [sort, setSort] = useState<string>("POPULARITY_DESC");

  const data = useGetData(sort, search || undefined);

  // TODO: add types to useGetData
  const { media } = data.Page;

  return (
    <Container maxW="container.xl" py={12}>
      <SearchFilter
        onSearch={(search) => {
          setSearch(search);
        }}
        onSortChange={(sort) => setSort(sort)}
      />
      <ShowTileList media={media} />
    </Container>
  );
};
