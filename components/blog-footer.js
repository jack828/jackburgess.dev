import { ShareButtons } from '../components'

const BlogFooter = ({ title }) => {
  return (
    <section>
      <hr />
      <div className="level">
        <div className="">
          <div className="level-item">
            <p>
              If you&lsquo;ve liked what I&lsquo;ve written, or it has helped
              you out, please consider sharing!
            </p>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <ShareButtons title={title} />
          </div>
        </div>
      </div>
      <hr />
    </section>
  )
}

export default BlogFooter
