import React from "react";
import {NextPage, NextPageContext} from "next";
import {isLoggedIn} from "../lib/auth";
import {withApollo, WithApollo} from "../lib/apollo";
import redirect from "../lib/redirect";
import Page from "../components/page";
import NavBar from "../components/navbar";

type Props = {}

const Index: NextPage<Props> = props => {
  return (
    <Page>
      <NavBar/>
    </Page>
  )
};

Index.getInitialProps = async (context: NextPageContext & WithApollo): Promise<Props> => {
  const user = await isLoggedIn(context.apolloClient);

  if (user === null) {
    redirect(context, '/signin');
  }

  return {user};
};

export default withApollo(Index);
