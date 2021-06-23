import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/cover-image'
import Link from 'next/link'

const HeroBlog = ({ title, coverImage, date, excerpt, author, slug }) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage
          title={title}
          src={coverImage}
          slug={slug}
          height={620}
          width={1240}
        />
      </div>
      <div className="">
        <div>
          <h3 className="mb-4 is-size-5">
            <Link as={`/blog/${slug}`} href="/blog/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 is-size-6">
            <DateFormatter date={date} />
          </div>
        </div>
        <div>
          <p className="is-size-8">{excerpt}</p>
        </div>
      </div>
    </section>
  )
}

export default HeroBlog
