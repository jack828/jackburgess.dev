import { BlogPreview } from '../components'

const HeroBlog = ({ blog }) => {
  return (
    <section>
      <h2 className="title pt-4">Latest Blog</h2>
      <div className="columns">
        <div className="column is-full">
          <BlogPreview blog={blog} />
        </div>
      </div>
    </section>
  )
}

export default HeroBlog
