const BlogBody = ({ content }) => {
  return (
    <div className="columns is-centered">
      <div className="column is-four-fifths">
        <div
          className="content content-override"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  )
}

export default BlogBody
