import BlogPreview from '../components/blog-preview'

const MoreBlogs = ({ blogs }) => {
  return (
    <section>
      <h2 className="title">More Stories</h2>
      <div className="columns">
        {blogs.map((blog) => (
          <BlogPreview key={blog.slug} {...blog} />
        ))}
      </div>
    </section>
  )
}

export default MoreBlogs
