import markdownStyles from '../styles/markdown.module.scss'

const BlogBody = ({ content }) => {
  return (
    <div className="mx-auto">
      <div
        className={markdownStyles.markdown}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default BlogBody
