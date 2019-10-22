import React, {useRef} from "react";
import Page from "../components/page";
import Input from "../components/input";
import Button from "../components/button";
import {useTranslation} from "react-i18next";
import {Align, Column} from "../components/layout";
import {useApolloClient, useMutation} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {withApollo} from "../lib/apollo";
import {NextPage} from "next";
import cookie from "cookie";
import redirect from "../lib/redirect";

type SingInResult = {
  signIn: {
    token: string | null;
  }
}

const SignIn: NextPage = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const apolloClient = useApolloClient();

  const [t] = useTranslation();
    const [signIn] = useMutation<SingInResult>(gql`
      mutation SignIn($username: String!, $password: String!) {
        signIn(username: $username, password: $password) {
          token
        }
      }
    `);

  async function onSignInClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (username.current !== null && password.current !== null) {
      try {
        const result = await signIn({
          variables: {
            username: username.current.value.trim(),
            password: password.current.value.trim(),
          }
        });

        if (result.data && result.data.signIn.token) {
          document.cookie = cookie.serialize('token', result.data.signIn.token);
          console.log(document.cookie);
          await apolloClient.cache.reset();
          redirect(null, '/');
        }

        console.log(result);
      } catch (error) {
        // TODO: Handle error
        console.error(error);
      }
    }
  }

  return (
    <Page horizontal={Align.Center} vertical={Align.Center}>
      <form>
        <Column>
          <img src="/logo.png" alt="MultisolutiON"/>
          <Input name="username" placeholder={t('username')} ref={username}/>
          <Input name="password" placeholder={t('password')} ref={password} type="password"/>
          <Button skin="primary" onClick={onSignInClick}>{t('sign_in')}</Button>
        </Column>
      </form>
    </Page>
  );
};

export default withApollo(SignIn);
