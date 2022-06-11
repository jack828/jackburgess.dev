import { BlogCard } from '../components'

const HeroBlog = ({ blog }) => {
  return (
    <section>
      <h2 className="title pt-4">Latest</h2>
      <div className="columns">
        <div className="column is-full">
          <BlogCard blog={blog} />
        </div>
      </div>
    </section>
  )
}

export default HeroBlog
