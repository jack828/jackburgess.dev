import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classnames from 'classnames'

const Navbar = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen((prevState) => !prevState)
  const isOnHome = router.asPath === '/'
  const isOnBlog = router.asPath.startsWith('/blog')

  return (
    <nav
      className="navbar has-shadow is-primary"
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
            <a className={classnames('navbar-item', { 'is-active': isOnHome })}>
              Home
            </a>
          </Link>
          <Link href="/blog" passHref>
            <a className={classnames('navbar-item', { 'is-active': isOnBlog })}>
              Blog
            </a>
          </Link>
        </div>

        <div className="navbar-end">
          {false && (
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">Log in</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
