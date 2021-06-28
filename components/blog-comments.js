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

const BlogComments = ({ slug }) => {
  return (
    <section>
      <div id="disqus_thread"></div>
      <script dangerouslySetInnerHTML={{ __html: disqusHtml(slug) }}></script>
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">
          comments powered by Disqus.
        </a>
      </noscript>
    </section>
  )
}

export default BlogComments
