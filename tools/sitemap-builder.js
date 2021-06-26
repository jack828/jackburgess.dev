const { writeFileSync } = require('fs')
const { join } = require('path')
const { getAllBlogs } = require('../lib/api')

const pages = ['/index', '/blog']
const blogs = getAllBlogs({ fields: ['slug'] }).map(({ slug }) => `/${slug}`)

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
writeFileSync(join(__dirname, '../public/sitemap.xml'), sitemap, 'utf8')
