import { BlogCard } from '../components'

const AllBlogs = ({ blogs }) => {
  return (
    <section>
      <h2 className="title pt-4">All Blogs</h2>
      <div className="columns is-flex-wrap-wrap	">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </section>
  )
}

export default AllBlogs
