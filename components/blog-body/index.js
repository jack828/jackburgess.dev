const BlogBody = ({ content }) => {
  return (
    <div
      className="content content-override"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default BlogBody
