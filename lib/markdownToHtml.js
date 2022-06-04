import { remark } from 'remark'
import html from 'remark-html'
import highlight from 'remark-highlight.js'
import footnotes from 'remark-footnotes'
import externalLinks from 'remark-external-links'
import slug from 'remark-slug'
import gfm from 'remark-gfm'
import autolinkHeadings from 'remark-autolink-headings'

const svgContent = {
  type: 'element',
  tagName: 'svg',
  properties: {
    className: ['svg-link'],
    viewBox: '0 0 16 16',
    version: '1.1',
    width: '16',
    height: '16'
  },
  children: [
    {
      type: 'element',
      tagName: 'path',
      properties: {
        fillRule: 'evenodd',
        d: 'M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'
      }
    }
  ]
}

const markdownToHtml = async (markdown) => {
  const result = await remark()
    .use(highlight)
    .use(footnotes, { inlineNotes: true })
    .use(externalLinks, {
      target: '_blank',
      rel: ['nofollow', 'noopener', 'noreferrer']
    })
    .use(slug)
    .use(autolinkHeadings, {
      content: svgContent
    })
    .use(gfm)
    .use(html)
    .process(markdown)
  return result.toString()
}

export default markdownToHtml
