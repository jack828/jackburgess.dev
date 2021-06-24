import { BlogPreview } from '../components'

const MoreBlogs = ({ blogs }) => {
  return (
    <section>
      <h2 className="title pt-4">More Stories</h2>
      <div className="columns">
        {blogs.map((blog) => (
          <BlogPreview key={blog.slug} {...blog} />
        ))}
      </div>
    </section>
  )
}

export default MoreBlogs
