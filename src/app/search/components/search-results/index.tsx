import { useRef, useEffect, useState } from "react";
import { Box, Container, Stack, VStack } from "@chakra-ui/react";
import { SearchFilter } from "@/app/search/components/search-filter";
import { ShowTileList } from "@/app/search/components/show-list";
import { useGetData } from "@/utils/data";
import { LoadingSpinner } from "@/components/loading-spinner";

export const SearchResults = () => {
  const [search, setSearch] = useState<string>();
  const [sort, setSort] = useState<string>("POPULARITY_DESC");

  const { data, loadMore } = useGetData(sort, search || undefined);

  const { media } = data.Page;

  const loadMoreButtonRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    if (loadMoreButtonRef.current) {
      observer.observe(loadMoreButtonRef.current);
    }

    return () => {
      if (loadMoreButtonRef.current) {
        observer.unobserve(loadMoreButtonRef.current);
      }
    };
  }, [loadMore]);

  return (
    <Container maxW="container.xl" py={12}>
      <SearchFilter
        onSearch={(search) => {
          setSearch(search);
        }}
        onSortChange={(sort) => setSort(sort)}
      />
      <ShowTileList media={media} />
      {/* We add a ref to the button here. */}
      <Stack direction="row" justifyContent="center" pt={8}>
        <Box ref={loadMoreButtonRef}>
          <LoadingSpinner />
        </Box>
      </Stack>
    </Container>
  );
};
