import App from 'next/app'
import React from 'react'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import '../i18n';

const theme = {
  borderRadius: '4px',
  colors: {
    primary: '#bad531',
  }
};

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; transition: all 200ms }
  html, body, #__next { height: 100%; }
  body { margin: 0; font-family: sans-serif, font-size: 14px; }
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
