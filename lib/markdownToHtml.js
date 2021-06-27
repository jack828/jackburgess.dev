import remark from 'remark'
import html from 'remark-html'
import highlight from 'remark-highlight.js'
import footnotes from 'remark-footnotes'
import externalLinks from 'remark-external-links'

const markdownToHtml = async (markdown) => {
  const result = await remark()
    .use(highlight)
    .use(footnotes, { inlineNotes: true })
    .use(externalLinks, {
      target: '_blank',
      rel: ['nofollow', 'noopener', 'noreferrer']
    })
    .use(html)
    .process(markdown)
  return result.toString()
}

export default markdownToHtml
