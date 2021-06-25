import classnames from 'classnames'
import { Container } from '../'
import styles from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={classnames(styles.footer, 'mt-4 py-2')}>
      <Container noPadding>
        Powered by tea, marmalade, and curiosity.
        <br />
        &lt;/website&gt;
      </Container>
    </footer>
  )
}

export default Footer
