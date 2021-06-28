import { BlogPreview } from '../components'

const BlogNavigation = ({ blogs: [prevBlog, nextBlog] = [] }) => {
  if (!prevBlog && !nextBlog) {
    return null
  }
  return (
    <section>
      <div className="level is-hidden-mobile">
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
          <div className="column is-half">
            <h2 className="title is-hidden-tablet">Previous</h2>
            <BlogPreview blog={prevBlog} />
          </div>
        ) : (
          <div className="column is-half p-0" />
        )}
        {nextBlog && (
          <div className="column is-half">
            <h2 className="title is-hidden-tablet has-text-right">Next</h2>
            <BlogPreview blog={nextBlog} />
          </div>
        )}
      </div>
      <hr />
    </section>
  )
}

export default BlogNavigation
