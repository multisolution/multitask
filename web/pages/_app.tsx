import App from 'next/app'
import React from 'react'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import '../i18n';

const theme = {
  borderRadius: '4px',
  colors: {
    primary: '#bad531',
    transparent: 'transparent',
  }
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=PT+Sans:400,700&display=swap');
  * {
    box-sizing: border-box;
    transition: all 200ms;
    margin: 0; padding: 0;
    font-family: 'PT Sans', sans-serif;
    font-size: 14px;
  }
  html, body, #__next { height: 100%; }
`;

export default class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle/>
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    )
  }
}
