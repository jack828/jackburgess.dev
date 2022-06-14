import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          {[32, 57, 76, 96, 128, 192, 228].map((size) => (
            /* Standard browser icons */
            <link
              key={`Favicon-${size}`}
              rel="icon"
              sizes={`${size}x${size}`}
              href={`/static/favicons/favicon-${size}.png`}
            />
          ))}
          {/* Android */}
          <link
            key={`Favicon-196`}
            rel="shortcut icon"
            sizes={`196x196`}
            href={`/static/favicons/favicon-196.png`}
          />
          {[120, 152, 180].map((size) => (
            /* Apple / iOS */
            <link
              key={`Favicon-${size}`}
              rel="apple-touch-icon"
              sizes={`${size}x${size}`}
              href={`/static/favicons/favicon-${size}.png`}
            />
          ))}
          {/* Windows / IE */}
          <meta
            name="msapplication-config"
            content="/static/favicons/browserconfig.xml"
          />
          {/* Safari */}
          <link
            rel="mask-icon"
            href="/static/favicons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          {/* Chrome */}
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <meta name="theme-color" content="#000000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        </Head>
        <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
