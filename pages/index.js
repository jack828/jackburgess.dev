import Head from 'next/head'
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

      <h1 className={styles.title}>Jack Burgess</h1>

      <p className={styles.description}>
        I like to write lots and lots of
        <code className={styles.code}>code.</code>
      </p>

      <div className={styles.grid}>
        <a
          href="https://github.com/jack828"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={styles.card}
        >
          <h2>GitHub &rarr;</h2>
          <p>Find all my public work on GitHub.</p>
        </a>

        <a
          href="https://clock.co.uk"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={styles.card}
        >
          <h2>Clock &rarr;</h2>
          <p>I work as a Mid-Weight Software Engineer for Clock Limited.</p>
          <p>Check them out!</p>
        </a>

        <a
          href="https://whitethorne.co.uk"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={styles.card}
        >
          <h2>Whitethorne &rarr;</h2>
          <p>I&lsquo;m also CTO for my own company.</p>
          <p>We make apps that (hopefully) disrupt industries.</p>
        </a>

        <a
          href="https://www.linkedin.com/in/jack-burgess828/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={styles.card}
        >
          <h2>LinkedIn &rarr;</h2>
          <p>See how professional I am.</p>
        </a>
      </div>
    </main>

    <footer className={styles.footer}>
      Powered by tea, marmalade, and curiosity.
    </footer>
  </div>
)

export default Index
