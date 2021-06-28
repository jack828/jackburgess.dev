const { writeFileSync } = require('fs')
const { join } = require('path')
const prettier = require('prettier')
const { getAllBlogs } = require('../lib/api')

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc')
  const pages = ['/index', '/blog']
  const blogs = getAllBlogs({ fields: ['slug'] }).map(
    ({ slug }) => `/blog/${slug}`
  )

  const allPages = [...pages, ...blogs]

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allPages
          .map(
            (path) =>
              `
              <url>
                 <loc>${`https://jackburgess.dev${
                   path === '/index' ? '' : path
                 }`}</loc>
              </url>
            `
          )
          .join('')}
    </urlset>
`
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  })

  writeFileSync(join(__dirname, '../public/sitemap.xml'), formatted, 'utf8')
})()
