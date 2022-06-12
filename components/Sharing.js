import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'
import SocialIcon from '@/components/social-icons'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`

export default function Sharing({ title, slug, fileName }) {
  const url = encodeURIComponent(`${siteMetadata.siteUrl}/blog/${slug}`)
  const encodedTitle = encodeURIComponent(title)
  return (
    <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
      If you&lsquo;ve liked what I&lsquo;ve written, or it has helped you out, please consider
      sharing!
      <div className="mt-3 flex flex-row items-center justify-center gap-x-2">
        <SocialIcon
          kind="twitter"
          href={`https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`}
          size="6"
        />
        <SocialIcon
          kind="facebook"
          href={`https://www.facebook.com/sharer.php?u=${url}`}
          size="6"
        />
        <SocialIcon
          kind="linkedin"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
          size="6"
        />
        <SocialIcon
          kind="reddit"
          href={`https://reddit.com/submit?url=${url}&title=${encodedTitle}`}
          size="6"
        />
        {` • `}
        <Link href={editUrl(fileName)}>View on GitHub</Link>
      </div>
    </div>
  )
}
