'use client';

import {
  // ApolloClient,
  ApolloLink,
  HttpLink
  // concat
} from '@apollo/client';
// import createUploadLink from 'apollo-upload-client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
  NextSSRApolloClient
} from '@apollo/experimental-nextjs-app-support/ssr';

const authMiddleware = new ApolloLink( ( operation, forward ) => {
  const token = process.env.NEXT_PUBLIC_TOKEN;
  operation.setContext( {
    headers: {
      authorization: token ? `Bearer ${ token }` : '',
    },
  } );

  return forward( operation );
} );

function makeClient () {
  const httpLink = new HttpLink( {
    uri: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  } );

  // const link = ApolloLink.from( [ authMiddleware, uploadLink, httpLink, ] );

  return new NextSSRApolloClient( {
    cache: new NextSSRInMemoryCache(
      {
        addTypename: false, // remove __typename from queries
        typePolicies: {
          Query: {
            fields: {
              // Specify fields for which caching should be disabled
              // Set the merge function to return undefined
              posts: {
                merge () {
                  return undefined;
                },
              },
            },
          },
        },
      }
    ),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from( [
          new SSRMultipartLink( {
            stripDefer: true,
          } ),
          authMiddleware,
          httpLink,
        ] )
        :
        ApolloLink.from( [
          authMiddleware,
          httpLink,
        ] ),
    // concat(
    //   authMiddleware,
    //   httpLink
    // ),
  } );
}

export function ApolloWrapper ( { children, }: React.PropsWithChildren ) {
  return (
    <ApolloNextAppProvider makeClient={ makeClient }>
      { children }
    </ApolloNextAppProvider>
  );
}