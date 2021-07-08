import { useState, useEffect } from 'react'
import Script from 'next/script'

const BlogComments = ({ slug }) => {
  const [showComments, setShowComments] = useState(null)

  useEffect(() => {
    window.disqus_config = function () {
      this.page.url = `https://jackburgess.dev/blog/${slug}`
      this.page.identifier = `${slug}`
    }
  }, [slug])

  if (!showComments) {
    return (
      <div className="box">
        <div className="content">
          <h2 className="title">Comments</h2>
          {showComments === null ? (
            <>
              <p>
                To prevent Disqus from phoning home and potentially leaving
                cookies on your device, you&lsquo;ll need to explicitly allow
                the comments embed to load.
              </p>
              <p>
                If you&lsquo;re okay with this, and want to participate, then
                please do!
              </p>
              <div className="buttons">
                <button
                  className="button is-success"
                  onClick={setShowComments.bind(null, true)}
                >
                  Allow
                </button>
                <button
                  className="button is-danger"
                  onClick={setShowComments.bind(null, false)}
                >
                  Deny
                </button>
              </div>
            </>
          ) : (
            <p>No tracking cookies here!</p>
          )}
        </div>
      </div>
    )
  }
  if (!showComments) {
    return null
  }
  return (
    <>
      <Script
        src="https://jackburgess.disqus.com/embed.js"
        data-timestamp={+new Date()}
        strategy={'afterInteractive' || 'lazyOnload'}
      />
      <section>
        <div id="disqus_thread"></div>
        <noscript>
          Please enable JavaScript to view the{' '}
          <a href="https://disqus.com/?ref_noscript">
            comments powered by Disqus.
          </a>
        </noscript>
      </section>
    </>
  )
}

export default BlogComments

/* Original disqus embed
const disqusHtml = (slug) => {
  return `
  var disqus_config = function () {
    this.page.url = 'https://jackburgess.dev/blog/${slug}';
    this.page.identifier = '${slug}';
  };
  (function() {
  var d = document, s = d.createElement('script');
  s.src = 'https://jackburgess.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
  })();
`
}
*/
