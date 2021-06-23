import classnames from 'classnames'
import Link from 'next/link'

export default function CoverImage({ title, src, slug, height, width }) {
  const image = (
    <img
      src={src}
      alt={`Cover Image for ${title}`}
      className={classnames('shadow-sm', {
        'hover:shadow-md transition-shadow duration-200': slug,
      })}
      layout="responsive"
      width={width}
      height={height}
    />
  )
  return (
    <div className="">
      {slug ? (
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
