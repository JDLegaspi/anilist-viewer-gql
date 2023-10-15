"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Text,
  Input,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";
import { useState, useRef, useCallback, useEffect } from "react";

type SearchFilterProps = {
  onSearch: (search?: string) => void;
  onSortChange: (sort: string) => void;
};

type SortingOptions = "POPULARITY" | "SCORE" | "FAVOURITES";

type NewType = {
  [key in SortingOptions]: string;
};

const sortingOptionsMap: NewType = {
  POPULARITY: "Popularity",
  SCORE: "Score",
  FAVOURITES: "Favourites",
};

export const SearchFilter = ({ onSearch, onSortChange }: SearchFilterProps) => {
  const [searchInput, setSearchInput] = useState<string>();
  const [isDescending, setIsDescending] = useState<boolean>(true);
  const [sort, setSort] = useState<SortingOptions>("POPULARITY");

  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback(() => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      onSearch(searchInput);
    }, 100);
  }, [onSearch, searchInput]);

  useEffect(() => {
    console.log(`${sort}${isDescending ? "_DESC" : ""}`);

    onSortChange(`${sort}${isDescending ? "_DESC" : ""}`);
  }, [sort, isDescending, onSortChange]);

  return (
    <HStack mb={5} justifyContent="space-between">
      <HStack>
        <Input
          placeholder="Search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          size="md"
          maxW="300px"
        />
        <Button onClick={handleSearch} size="md">
          Search
        </Button>
      </HStack>
      <HStack>
        <Menu>
          <MenuButton as={Button}>
            <HStack>
              <Text>{sortingOptionsMap[sort]}</Text>
              <ChevronDownIcon />
            </HStack>
          </MenuButton>
          <MenuList>
            {Object.entries(sortingOptionsMap).map(([key, value]) => (
              <MenuItem
                key={value}
                onClick={() => setSort(key as SortingOptions)}
              >
                {value}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Button onClick={() => setIsDescending(!isDescending)}>
          {isDescending ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </Button>
      </HStack>
    </HStack>
  );
};
