import classnames from 'classnames'
import Mail from './mail.svg'
import Github from './github.svg'
import Facebook from './facebook.svg'
import Youtube from './youtube.svg'
import Linkedin from './linkedin.svg'
import Twitter from './twitter.svg'
import Reddit from './reddit.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  reddit: Reddit
}

const SocialIcon = ({ className, svgClassName, kind, href, size = 8 }) => {
  if (
    !href ||
    (kind === 'mail' &&
      !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
  )
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className={classnames(
        'text-sm text-gray-500 transition hover:text-gray-600',
        className
      )}
      target="_blank"
      rel="noopener noreferrer nofollow"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={classnames(
          `fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 h-${size} w-${size}`,
          svgClassName
        )}
      />
    </a>
  )
}

export default SocialIcon
