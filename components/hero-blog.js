import { BlogPreview } from '../components'

const HeroBlog = ({ blog }) => {
  return (
    <section>
      <h2 className="title pt-4">Latest Blog</h2>
      <div className="columns">
        <BlogPreview {...blog} />
      </div>
    </section>
  )
}

export default HeroBlog
