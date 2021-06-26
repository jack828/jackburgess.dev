import Link from 'next/link'
import { DateFormatter } from '../components'

const BlogPreview = ({
  blog: { title, sell, coverImage, date, slug, tags }
}) => {
  return (
    <Link as={`/blog/${slug}`} href="/blog/[slug]" passHref>
      <a>
        <div className="card">
          <div className="card-image">
            <figure className="image is-16by9">
              <img src={coverImage} alt={title} />
            </figure>
          </div>
          <header className="card-header">
            <p className="card-header-title">{title}</p>
          </header>
          <div className="card-content">
            <div className="content">{sell}</div>
          </div>
          <footer className="card-footer">
            <div className="card-footer-item">
              <DateFormatter date={date} />
            </div>
            <div className="card-footer-item">
              <div className="tags">
                {tags.map((tag) => (
                  <div key={tag} className="tag is-primary">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </a>
    </Link>
  )
}

export default BlogPreview
