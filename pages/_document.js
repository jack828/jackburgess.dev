import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta charset="utf-8" />
        </Head>
        <body>
          <Main id="main" />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
