// import styles from './blog-body.module.scss'

const BlogBody = ({ content }) => {
  return (
    <div className="mx-auto">
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default BlogBody
