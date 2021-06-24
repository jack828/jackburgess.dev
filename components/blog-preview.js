import Link from 'next/link'
import { DateFormatter } from '../components'

const BlogPreview = ({ title, sell, coverImage, date, slug }) => {
  return (
    <div className="column">
      <Link as={`/blog/${slug}`} href="/blog/[slug]" passHref>
        <a>
          <div className="card">
            <div className="card-image">
              <figure className="image is-16by9">
                <img
                  src="https://img.clock.co.uk/1280x720"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <header className="card-header">
              <p className="card-header-title">{title}</p>
            </header>
            <div className="card-content">
              <div className="content">
                {sell}
                <br />

                <div className="has-text-right">
                  <DateFormatter date={date} />
                </div>
              </div>
            </div>
            <footer className="card-footer">
              <div className="card-footer-item">{tags.join(' | ')}</div>
            </footer>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default BlogPreview
