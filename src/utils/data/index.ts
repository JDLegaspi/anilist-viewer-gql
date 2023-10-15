import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useState } from "react";

const GET_SHOWS_QUERY = gql`
  query Page($page: Int, $perPage: Int, $search: String, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
        lastPage
        perPage
        total
      }
      media(search: $search, sort: $sort, isAdult: false) {
        coverImage {
          large
        }
        coverImage {
          color
        }
        popularity
        averageScore
        title {
          romaji
          english
        }
        description
        startDate {
          year
          month
          day
        }
      }
    }
  }
`;

export type Media = {
  coverImage: {
    large: string;
    color: string;
  };
  popularity: number | null;
  averageScore: number | null;
  title: {
    romaji: string;
    english?: string | null;
  };
  description: string | null;
  startDate: {
    year: number | null;
    month: number | null;
    day: number | null;
  };
};

type AnilistResponse = {
  Page: {
    pageInfo: {
      hasNextPage: boolean;
    };
    media: Media[];
  };
};

export const useGetData = (sort: string, search?: string) => {
  const [page, setPage] = useState(1);
  const perPage = 40;

  const { data, fetchMore } = useSuspenseQuery<AnilistResponse>(
    GET_SHOWS_QUERY,
    {
      variables: {
        page: 0,
        perPage,
        search,
        sort,
      },
    }
  );

  const loadMore = () => {
    if (data && data.Page.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          page: page + 1,
          perPage,
          search,
          sort,
        },
        updateQuery(previousQueryResult, options) {
          if (!options.fetchMoreResult) return previousQueryResult;

          return {
            ...previousQueryResult,
            Page: {
              ...previousQueryResult.Page,
              media: [
                ...previousQueryResult.Page.media,
                ...options.fetchMoreResult.Page.media,
              ],
            },
          };
        },
      });

      setPage(page + 1);
    }
  };

  return {
    data,
    loadMore,
  };
};
