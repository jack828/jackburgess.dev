import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          {/* New Browsers*/}
          <link
            key={`Favicon-svg`}
            rel="icon"
            type="image/svg+xml"
            href={`/static/favicons/favicon.svg`}
          />
          {/* Old Browsers */}
          <link
            key={`Favicon-ico`}
            rel="icon"
            sizes={`any`}
            href={`/favicon.ico`}
          />
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
            rel="icon"
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

          <script
            dangerouslySetInnerHTML={{
              __html: `
  var _paq = (window._paq = window._paq || [])
  _paq.push(['disableCookies'])
  _paq.push(['trackPageView'])
  _paq.push(['enableLinkTracking'])
  _paq.push(['enableHeartBeatTimer'])
  _paq.push(['setRequestMethod', 'POST'])
  ;(function () {
    var u = '//stats.jack.tf/'
    _paq.push(['setTrackerUrl', u + 'moomoo.php'])
    _paq.push(['setSiteId', '1'])
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0]
    g.async = true
    g.src = u + 'moomoo.js'
    s.parentNode.insertBefore(g, s)
  })()
`
            }}
          />
        </Head>
        <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
          {/* Cloudflare Web Analytics */}
          <script
            defer
            src="/cf-beacon.min.js"
            data-cf-beacon='{"token": "73cbd72b8d264c2985b81306ca184e4a"}'
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
