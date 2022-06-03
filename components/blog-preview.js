import Link from 'next/link'
import { DateFormatter } from '../components'

const BlogPreview = ({ blog: { title, sell, date, slug, tags } }) => {
  return (
    <Link as={`/blog/${slug}`} href="/blog/[slug]" passHref>
      <a>
        <div className="card">
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
