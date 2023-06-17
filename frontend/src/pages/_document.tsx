import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";

export default function Document() {
  return (
    <Html lang="en" data-bs-theme="dark">
      <Head />
      <body style={{padding: "1%"}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
