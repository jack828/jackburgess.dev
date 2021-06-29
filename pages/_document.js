import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            href="/fonts/oxygen-v10-latin-regular.woff2"
            crossOrigin
          />
        </Head>
        <body>
          <Main id="main" />
          <NextScript />
          {/* Cloudflare Web Analytics */}
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "c7fad099cedb4644a6a6cf81724dbe42"}'
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
