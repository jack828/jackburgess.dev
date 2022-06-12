import Image from './Image'
import Link from './Link'

const Wrapper = ({ className, href, title, children }) => {
  if (!href) return <>{children}</>
  return (
    <Link className={className} href={href} aria-label={`Link to ${title}`}>
      {children}
    </Link>
  )
}

const Card = ({ title, description, imgSrc, href, linkText }) => (
  <div className="md p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
    <div
      className={`${
        imgSrc && 'h-full'
      }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
    >
      {imgSrc && (
        <Wrapper href={href} title={title}>
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        </Wrapper>
      )}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          <Wrapper href={href} title={title}>
            {title}
          </Wrapper>
        </h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
          {description}
        </p>
        {href && (
          <Wrapper
            href={href}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            {linkText} &rarr;
          </Wrapper>
        )}
      </div>
    </div>
  </div>
)

export default Card
