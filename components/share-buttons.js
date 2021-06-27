import { useRouter } from 'next/router'
import { SocialIcon } from 'react-social-icons'

const ShareButtons = ({ title }) => {
  const router = useRouter()
  const url = encodeURIComponent(`https://jackburgess.dev${router.asPath}`)

  const props = {
    target: '_blank',
    rel: 'noopener noreferrer nofollow',
    style: { width: 32, height: 32 }
  }
  return (
    <>
      <SocialIcon
        network="twitter"
        url={`https://twitter.com/intent/tweet?url=${url}&text=${title}`}
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
        url={`https://reddit.com/submit?url=${url}&title=${title}`}
        {...props}
      />
    </>
  )
}

export default ShareButtons
