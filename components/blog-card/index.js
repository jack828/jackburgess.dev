import classnames from 'classnames'
import Link from 'next/link'
import { DateFormatter } from '../'
import styles from './blog-card.module.scss'

const BlogCard = ({ blog: { title, sell, date, slug, tags } }) => {
  return (
    <div className={classnames('column is-12')}>
      <Link as={`/blog/${slug}`} href="/blog/[slug]" passHref>
        <a>
          <div className={classnames('card', styles.card)}>
            <div className={styles.stacked}>
              <header className="card-header">
                <p className="card-header-title title is-4">{title}</p>
              </header>
              <div className={classnames('card-content', styles.content)}>
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
          </div>
        </a>
      </Link>
    </div>
  )
}

export default BlogCard
