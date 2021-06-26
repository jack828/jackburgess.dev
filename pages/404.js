import classnames from 'classnames'
import { Layout, Container, Meta } from '../components'
import styles from '../styles/404.module.scss'

const NotFound = () => (
  <Layout>
    <Container fluid>
      <Meta title="Not Found" description="Page not found" />

      <div className="columns is-align-items-center pt-4">
        <div className={classnames(styles.errorCode, 'column has-text-right')}>
          <p className="title">404</p>
        </div>
        <div className="column has-text-left">
          <p className="subtitle">We couldn&lsquo;t find a page there.</p>
        </div>
      </div>
      <div className="columns">
        <div className="column has-text-centered">
          <p className="is-size-6">
            Have you tried going to a page that I&lsquo;ve added?
          </p>
        </div>
      </div>
    </Container>
  </Layout>
)

export default NotFound
