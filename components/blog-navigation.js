import { BlogPreview } from '../components'

const BlogNavigation = ({ blogs: [prevBlog, nextBlog] = [] }) => {
  if (!prevBlog && !nextBlog) {
    return null
  }
  return (
    <section>
      <div className="level">
        <div className="level-left">
          {prevBlog && (
            <div className="level-item">
              <h2 className="title">Previous</h2>
            </div>
          )}
        </div>
        <div className="level-right">
          {nextBlog && (
            <div className="level-item">
              <h2 className="title">Next</h2>
            </div>
          )}
        </div>
      </div>
      <div className="columns">
        {prevBlog ? (
          <BlogPreview blog={prevBlog} medium />
        ) : (
          <div className="column is-half" />
        )}
        {nextBlog && <BlogPreview blog={nextBlog} medium />}
      </div>
    </section>
  )
}

export default BlogNavigation
