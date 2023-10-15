import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`
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
};

export const useGetData = (sort: string, search?: string) => {
  const { data } = useSuspenseQuery<{
    Page: {
      media: Media[];
    };
  }>(query, {
    variables: {
      page: 1,
      perPage: 100,
      search,
      sort,
    },
  });

  return data;
};
