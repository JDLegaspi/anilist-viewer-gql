import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const getApolloClientForServerComponent = (uri: string) => {
  const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri,
      }),
    });
  });

  return getClient();
};
