import Container from '../container'
import styles from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        Powered by tea, marmalade, and curiosity.
        <br />
        &lt;/website&gt;
      </Container>
    </footer>
  )
}

export default Footer
