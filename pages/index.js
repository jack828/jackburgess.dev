import Head from 'next/head'
import classnames from 'classnames'
import styles from '../styles/Home.module.scss'

const Index = () => (
  <div className={styles.container}>
    <Head>
      <title>Jack Burgess | Software Engineer</title>
    </Head>

    <main className={styles.main}>
      <img
        className={styles.profile}
        src="https://gravatar.com/avatar/15f72cea858c4bf90523f32a4c88c862?s=256"
        alt="Profile Picture"
        width={256}
        height={256}
      />

      <div className="columns is-centered">
        <div className="column is-narrow">
          <h1 className="is-size-1">Jack Burgess</h1>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-narrow">
          <p className="is-size-4">
            I like to write lots and lots of
            <code className={styles.code}>code.</code>
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

      <h2>Languages and Tools</h2>
      <p></p>

      <p>
        &nbsp;
        <img
          align="center"
          src="https://github-readme-stats.vercel.app/api?username=jack828&show_icons=true&locale=en"
          alt="jack828"
        />
      </p>

      <p>
        <img
          align="center"
          src="https://github-readme-streak-stats.herokuapp.com/?user=jack828&"
          alt="jack828"
        />
      </p>
    </main>

    <footer className={styles.footer}>
      Powered by tea, marmalade, and curiosity.
      <br />
      &lt;/website&gt;
    </footer>
  </div>
)

export default Index
