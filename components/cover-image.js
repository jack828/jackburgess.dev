import classnames from 'classnames'
import Link from 'next/link'

const CoverImage = ({ title, src, slug, height, width }) => {
  const image = (
    <img
      src={src}
      alt={`Cover Image for ${title}`}
      className={classnames('shadow-sm')}
      width={width}
      height={height}
    />
  )
  return (
    <figure className="image is-16by9">
      {slug ? (
        <Link as={`/blog/${slug}`} href="/blog/[slug]" passHref>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </figure>
  )
}

export default CoverImage
