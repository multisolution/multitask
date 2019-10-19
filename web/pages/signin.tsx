import React from "react";
import Page from "../components/page";
import Input from "../components/input";
import Button from "../components/button";
import {useTranslation} from "react-i18next";
import {Column} from "../components/layout";

const SignIn: React.FunctionComponent = () => {
  const [t] = useTranslation();

  return (
    <Page>
      <form>
        <Column>
          <img src="/logo.png" alt="MultisolutiON"/>
          <Input name="username" placeholder={t('username')}/>
          <Input name="password" placeholder={t('password')} type="password"/>
          <Button skin="primary">{t('sign_in')}</Button>
        </Column>
      </form>
    </Page>
  );
};

export default SignIn;