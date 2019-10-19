import App from 'next/app'
import React from 'react'
import {createGlobalStyle, ThemeProvider} from 'styled-components'

const theme = {
  colors: {
    primary: '#0070f3'
  }
};

const GlobalStyle = createGlobalStyle`
  html, body, #__next { height: 100%; }
  body { margin: 0; }
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