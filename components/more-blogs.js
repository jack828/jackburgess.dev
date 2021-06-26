import { BlogPreview } from '../components'

const MoreBlogs = ({ blogs }) => {
  return (
    <section>
      <h2 className="title pt-4">More Blogs</h2>
      <div className="columns">
        {blogs.map((blog) => (
          <div key={blog.slug} className="column is-half">
            <BlogPreview blog={blog} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default MoreBlogs
