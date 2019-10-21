import ApolloClient from "apollo-client";
import {NormalizedCacheObject} from "apollo-cache-inmemory";
import gql from 'graphql-tag';

export async function isLoggedIn(apolloClient: ApolloClient<NormalizedCacheObject>): Promise<any | null> {
    try {
        const result = await apolloClient.query({
            query: gql`
                query user {
                    me {
                        id
                    }
                }
            `
        });

      return result.data;
    } catch (error) {
      //TODO: Handle errors
      console.error(error);
      return null;
    }
}
