import { useState } from 'react'
import classnames from 'classnames'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen((prevState) => !prevState)
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          Home
        </a>

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
          <a className="navbar-item">Blogs</a>
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
