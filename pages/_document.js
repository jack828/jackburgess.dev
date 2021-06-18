import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta charSet="utf-8" />
          <link
            rel="preload"
            as="font"
            href="https://fonts.googleapis.com/css?family=Oxygen:400,700&display=swap"
          />
        </Head>
        <body>
          <Main id="main" />
          <NextScript />
          {/* Cloudflare Web Analytics */}
          {process.env.NODE_ENV === 'production' && (
            <script
              defer
              src="https://static.cloudflareinsights.com/beacon.min.js"
              data-cf-beacon='{"token": "c7fad099cedb4644a6a6cf81724dbe42"}'
            />
          )}
        </body>
      </Html>
    )
  }
}

export default MyDocument
