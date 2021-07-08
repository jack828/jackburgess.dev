import { useState } from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Headroom from 'react-headroom'

const Navbar = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen((prevState) => !prevState)
  const isOnHome = router.asPath === '/'
  const isOnBlog = router.asPath.startsWith('/blog')

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

          <a
            role="button"
            className={classnames('navbar-burger', { 'is-active': open })}
            onClick={toggleOpen}
            aria-label="menu"
            aria-expanded={open ? 'true' : 'false'}
            data-target="navbar"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbar"
          className={classnames('navbar-menu', { 'is-active': open })}
        >
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
          </div>
        </div>
      </nav>
    </Headroom>
  )
}

export default Navbar
