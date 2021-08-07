import classnames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Headroom from 'react-headroom'

const Navbar = () => {
  const router = useRouter()
  const isOnHome = router.asPath === '/'
  const isOnBlog = router.asPath.startsWith('/blog')
  const isOnTools = router.asPath.startsWith('/tools')

  return (
    <Headroom>
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link href="/" passHref>
            <a className="navbar-item">jackburgess.dev</a>
          </Link>
        </div>

        <div id="navbar" className="navbar-end">
          <div className="navbar-start">
            <Link href="/" passHref>
              <a
                className={classnames('navbar-item', { 'is-active': isOnHome })}
              >
                Home
              </a>
            </Link>
            <Link href="/blog" passHref>
              <a
                className={classnames('navbar-item', { 'is-active': isOnBlog })}
              >
                Blog
              </a>
            </Link>
            <Link href="/tools" passHref>
              <a
                className={classnames('navbar-item', {
                  'is-active': isOnTools
                })}
              >
                Tools
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </Headroom>
  )
}

export default Navbar
