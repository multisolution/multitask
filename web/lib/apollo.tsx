import {NextPage, NextPageContext} from "next";
import {ApolloClient} from "apollo-client";
import {InMemoryCache, NormalizedCacheObject} from "apollo-cache-inmemory";
import {HttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";
import cookie from "cookie";
import {ApolloProvider} from "@apollo/react-common";
import React from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export type WithApollo = {
  apolloClient: ApolloClient<NormalizedCacheObject>,
  apolloState: any,
}

export function withApollo<PageProps>(PageComponent: NextPage, {ssr = true}: { ssr?: boolean } = {}) {
  const WithApollo = ({apolloClient, apolloState, ...pageProps}: WithApollo & PageProps) => {
    const client = apolloClient || initApolloClient(apolloState, getTokenFromWindow());
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  };

  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (context: NextPageContext & WithApollo) => {
      const {AppTree} = context;
      const apolloClient = (context.apolloClient = initApolloClient({}, getTokenFromContext(context)));

      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(context)
        : {};

      if (typeof window === 'undefined') {
        if (context.res && context.res.finished) {
          return {}
        }

        if (ssr) {
          try {
            const {getDataFromTree} = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }}
              />
            )
          } catch (error) {
            console.error('Error while running `getDataFromTree`', error)
          }
        }

        Head.rewind()
      }

      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState
      }
    }
  }

  return WithApollo
}

function initApolloClient(initialState: any, getToken: () => string | null): ApolloClient<NormalizedCacheObject> {
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, getToken);
  }

  if (apolloClient === null) {
    apolloClient = createApolloClient(initialState, getToken);
  }

  return apolloClient;
}

function createApolloClient(initialState: any, getToken: () => string | null): ApolloClient<NormalizedCacheObject> {
  const fetchOptions = {};

  const http = new HttpLink({
    uri: 'http://localhost:8000',
    fetch,
    fetchOptions,
  });

  const auth = setContext((request, {headers}) => {
    const token = getToken();

    return {
      headers: {
        ...headers,
        authorization: token === null ? '' : `Bearer ${token}`,
      }
    };
  });

  return new ApolloClient<NormalizedCacheObject>({
    ssrMode: typeof window === 'undefined',
    link: auth.concat(http),
    cache: new InMemoryCache().restore(initialState),
  });
}

function getTokenFromContext(context: NextPageContext): () => string | null {
  if (context.req && context.req.headers.cookie) {
    return getToken(context.req.headers.cookie);
  }

  return getToken('');
}

function getTokenFromWindow(): () => string | null {
  if (typeof window !== "undefined") {
    return getToken(window.document.cookie);

  }

  return getToken('');

}

function getToken(path: string): () => string | null {
  return (): string | null => {
    const cookies = cookie.parse(path);
    return cookies.token;
  };
}
