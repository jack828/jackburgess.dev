import classnames from 'classnames'
import styles from './blog-body.module.scss'

const BlogBody = ({ content }) => {
  return (
    <div
      className={classnames(styles.markdown, 'content')}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default BlogBody
