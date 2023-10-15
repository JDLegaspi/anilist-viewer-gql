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
