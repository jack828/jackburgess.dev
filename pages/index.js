import Link from 'next/link'
import classnames from 'classnames'
import { Navbar, ExternalLink, Meta } from '../components'
import styles from '../styles/Home.module.scss'

const Index = () => (
  <>
    <Meta description="Hey - I am a software engineer from the UK. I love making websites and apps. Maybe you’ll use one of them one day." />
    <Navbar />
    <section className="hero is-primary is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-align-items-center">
            <div className="column has-text-centered-mobile">
              Hello! I am
              <h1 className="title is-1">Jack Burgess</h1>
              <h2 className="subtitle is-3">Software Engineer</h2>
            </div>
            <div className="column">
              <div className="columns is-centered">
                <div
                  className={classnames(
                    styles.profileContainer,
                    'column is-narrow'
                  )}
                >
                  <figure className="image">
                    <img
                      className={classnames(styles.profile, 'is-rounded')}
                      src="/profile-picture.jpeg"
                      alt="Profile Picture"
                      width={256}
                      height={256}
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="columns is-centered has-text-centered">
        <div className="column">
          <h2 className="is-size-1-desktop is-size-2-tablet is-size-3-mobile">
            About Me
          </h2>
        </div>
      </div>
      <div className="columns is-centered has-text-centered">
        <div className="column is-four-fifths">
          <p className="is-size-5">
            UK-based Software Engineer currently working from Scotland. I have a
            love for programming which I have been doing full time at{' '}
            <ExternalLink href="https://clock.co.uk">
              Clock Limited
            </ExternalLink>{' '}
            for the last 5 years.
            <br />
            You can see all my educational and professional experience on
            LinkedIn.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="columns has-text-centered">
          <div className="column">
            <h2 className="is-size-1-desktop is-size-2-tablet is-size-3-mobile">
              Highlights
            </h2>
          </div>
        </div>
        <div className="container">
          <div className="columns">
            <div className="column">
              <Link href="/blog" passHref>
                <a className={classnames(styles.box, 'box is-fullheight')}>
                  <div className="content">
                    <h4 className="title is-5">Blog &rarr;</h4>
                    <p>
                      I&lsquo;m putting some useful stuff I&lsquo;ve learnt on
                      my blog to hopefully help someone out.
                    </p>
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <ExternalLink
                href="https://github.com/jack828"
                className={classnames(styles.box, 'box is-fullheight')}
              >
                <div className="content">
                  <h4 className="title is-5">GitHub &rarr;</h4>
                  <p>
                    Find all my public work on GitHub. I like to fix typos in
                    open-source software.
                  </p>
                </div>
              </ExternalLink>
            </div>
            <div className="column">
              <ExternalLink
                href="https://clock.co.uk"
                className={classnames(styles.box, 'box is-fullheight')}
              >
                <div className="content">
                  <h4 className="title is-5">Clock &rarr;</h4>
                  <p>
                    I work as a Mid-Weight Software Engineer for Clock Limited.
                    <br />
                    Check them out!
                  </p>
                </div>
              </ExternalLink>
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <ExternalLink
                href="https://whitethorne.co.uk"
                className={classnames(styles.box, 'box is-fullheight')}
              >
                <div className="content">
                  <h4 className="title is-5">Whitethorne &rarr;</h4>
                  <p>
                    I&lsquo;m also CTO of my own company.
                    <br />
                    We make apps that (hopefully) disrupt industries.
                  </p>
                </div>
              </ExternalLink>
            </div>
            <div className="column">
              <ExternalLink
                href="https://www.linkedin.com/in/jack-burgess828/"
                className={classnames(styles.box, 'box is-fullheight')}
              >
                <div className="content">
                  <h4 className="title is-5">LinkedIn &rarr;</h4>
                  <p>See how professional I am.</p>
                </div>
              </ExternalLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="columns has-text-centered">
          <div className="column">
            <h2 className="is-size-1-desktop is-size-2-tablet is-size-3-mobile">
              Projects
            </h2>
            <h3 className="subtitle is-5">
              I quite like to dabble in technologies I don&lsquo;t get to use at
              work - mainly embedded systems.
            </h3>
          </div>
        </div>
        <div className="container">
          <div className="columns">
            <div className="column">
              <ExternalLink
                href="https://github.com/jack828/esp32-solar"
                className={classnames(styles.box, 'box is-fullheight')}
              >
                <div className="content">
                  <h4 className="title is-5">ESP32 Solar System &rarr;</h4>
                  <p>
                    Using a MAKERFABS ESP32-TOUCH-CAMERA development board, I
                    ported and extended some code by another user to work with
                    the constraints of the ESP32 environment.
                  </p>
                </div>
              </ExternalLink>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <ExternalLink
                href="https://github.com/jack828/esp32-logger"
                className={classnames(styles.box, 'box is-fullheight')}
              >
                <div className="content">
                  <h4 className="title is-5">ESP32 Logger &rarr;</h4>
                  <p>
                    My home environment logger has gone through multiple
                    iterations - first it logged data by POSTing to{' '}
                    <ExternalLink href="https://github.com/jack828/pihome">
                      PiHome
                    </ExternalLink>{' '}
                    (which was a MongoDB backend with some very primitive
                    graphing capabilities!) - now it uses InfluxDB+Grafana on my
                    home NAS to supercharge my metrics.
                  </p>
                  <p>Data has never tasted so sweet.</p>
                </div>
              </ExternalLink>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <ExternalLink
                href="https://github.com/jack828/dotfiles"
                className={classnames(styles.box, 'box is-fullheight')}
              >
                <div className="content">
                  <h4 className="title is-5">Dotfiles &rarr;</h4>
                  <p>
                    The heart of my development environment - using Neovim and
                    Tmux to effortlessly refactor code and add new{' '}
                    <strike>bugs</strike> features.
                  </p>
                </div>
              </ExternalLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="columns is-centered has-text-centered">
          <div className="column">
            <h2 className="is-size-1-desktop is-size-2-tablet is-size-3-mobile">
              GitHub Stats
            </h2>
            <h3 className="subtitle is-5">
              Because we all know this is the only thing that is important.
            </h3>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <img
              align="center"
              src="https://github-readme-stats.vercel.app/api?username=jack828&show_icons=true&locale=en&count_private=true"
              alt="jack828"
            />
          </div>
          <div className="column">
            <img
              align="center"
              src="https://github-readme-streak-stats.herokuapp.com/?user=jack828&"
              alt="jack828"
            />
          </div>
        </div>
      </section>
    </section>
  </>
)

export default Index
