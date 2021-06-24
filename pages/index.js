import Head from 'next/head'
import classnames from 'classnames'
import { Layout, Container } from '../components'
import styles from '../styles/Home.module.scss'

const Index = () => (
  <Layout>
    <Container>
      <Head>
        <title>Jack Burgess | Software Engineer</title>
      </Head>

      <div className="columns is-centered has-text-centered">
        <img
          className={classnames(styles.profile, 'is-align-self-center	')}
          src="https://gravatar.com/avatar/15f72cea858c4bf90523f32a4c88c862?s=256"
          alt="Profile Picture"
          width={256}
          height={256}
        />
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
  </Layout>
)

export default Index
