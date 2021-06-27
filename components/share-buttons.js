import { useRouter } from 'next/router'
import { SocialIcon } from 'react-social-icons'

const ShareButtons = ({ title }) => {
  const router = useRouter()
  const path = router.asPath
  const cleanPath = path.includes('#') ? path.slice(0, path.indexOf('#')) : path
  const url = encodeURIComponent(`https://jackburgess.dev${cleanPath}`)
  const encodedTitle = encodeURIComponent(title)

  const props = {
    target: '_blank',
    rel: 'noopener noreferrer nofollow',
    style: { width: 32, height: 32, margin: '0px 6px' }
  }
  return (
    <>
      <SocialIcon
        network="twitter"
        url={`https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`}
        {...props}
      />
      <SocialIcon
        network="facebook"
        url={`https://www.facebook.com/sharer.php?u=${url}`}
        {...props}
      />
      <SocialIcon
        network="linkedin"
        url={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
        {...props}
      />
      <SocialIcon
        network="reddit"
        url={`https://reddit.com/submit?url=${url}&title=${encodedTitle}`}
        {...props}
      />
    </>
  )
}

export default ShareButtons
