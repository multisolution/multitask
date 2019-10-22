import React from "react";
import styled from "styled-components";
import Button from "./button";
import {useTranslation} from "react-i18next";
import {useApolloClient, useMutation} from "@apollo/react-hooks";
import gql from "graphql-tag";
import cookie from "cookie";
import redirect from "../lib/redirect";

const Nav = styled.nav`
  background: #222;
  display: flex;
  color: white;
  width: 100%;
  align-items: center;
  padding: 0 16px;
`;

const Left = styled.div`
  flex: 1;
  justify-self: flex-start;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

type SignOutResult = {
  signOut: boolean
}

const NavBar: React.FunctionComponent = () => {
  const [t] = useTranslation();
  const apolloClient = useApolloClient();
    const [signOut] = useMutation<SignOutResult>(gql`
      mutation SignOut {
        signOut
      }
    `);

  async function onSignOutClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    try {
      const result = await signOut();

      if (result.data && result.data.signOut) {
        await apolloClient.cache.reset();
        document.cookie = cookie.serialize('token', '', {
          maxAge: -1
        });
        redirect(null, '/signin');
      }

    } catch (error) {
      //TODO: Handle error
      console.error(error);
    }
  }

  return (
    <Nav>
      <Left>
        <img src="/logo.png" alt="MultisolutiON"/>
      </Left>
      <Right>
        <Button skin="transparent" onClick={onSignOutClick}>
          {t('sign_out')}
        </Button>
      </Right>
    </Nav>
  )
};

export default NavBar;
