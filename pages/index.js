import classnames from 'classnames'
import { Navbar, Layout, Container, Meta } from '../components'
import styles from '../styles/Home.module.scss'

const Index = () => (
  <>
    <Meta description="Hey - I am a software engineer from the UK. I love making websites and apps. Maybe you’ll use one of them one day." />
    <Navbar />
    <section className="hero is-primary is-fullheight">
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

    <Container>
      <div className="columns is-centered has-text-centered">
        <figure className="image is-128x128">
          <img
            className={classnames(
              styles.profile,
              'is-rounded is-align-self-center'
            )}
            src="/profile-picture.jpeg"
            alt="Profile Picture"
            width={256}
            height={256}
          />
        </figure>
      </div>

      <div className="columns is-centered has-text-centered">
        <div className="column">
          <h1 className="is-size-1-desktop is-size-2-tablet is-size-3-mobile">
            Jack Burgess
          </h1>
        </div>
      </div>
      <div className="columns is-centered has-text-centered">
        <div className="column">
          <p className="is-size-4-desktop is-size-5-tablet is-size-6-mobile">
            I like to write lots and lots of
            <code>code.</code>
          </p>
        </div>
      </div>

      <div className="columns">
        <a
          href="https://github.com/jack828"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={classnames(styles.card, 'column')}
        >
          <h2>GitHub &rarr;</h2>
          <p>Find all my public work on GitHub.</p>
        </a>

        <a
          href="https://clock.co.uk"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={classnames(styles.card, 'column')}
        >
          <h2>Clock &rarr;</h2>
          <p>I work as a Mid-Weight Software Engineer for Clock Limited.</p>
          <p>Check them out!</p>
        </a>
      </div>

      <div className="columns">
        <a
          href="https://whitethorne.co.uk"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={classnames(styles.card, 'column')}
        >
          <h2>Whitethorne &rarr;</h2>
          <p>I&lsquo;m also CTO for my own company.</p>
          <p>We make apps that (hopefully) disrupt industries.</p>
        </a>

        <a
          href="https://www.linkedin.com/in/jack-burgess828/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={classnames(styles.card, 'column')}
        >
          <h2>LinkedIn &rarr;</h2>
          <p>See how professional I am.</p>
        </a>
      </div>

      <div className="columns is-centered has-text-centered">
        <div className="column is-narrow">
          <h2 className="is-size-4">GitHub Stats</h2>
          <p className="is-size-6">
            Because we all know this is the only thing that is important.
          </p>
        </div>
      </div>
      <div className="columns is-centered has-text-centered">
        <div className="column">
          <img
            align="center"
            src="https://github-readme-stats.vercel.app/api?username=jack828&show_icons=true&locale=en"
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
    </Container>
  </>
)

export default Index
