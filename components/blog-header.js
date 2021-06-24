import { DateFormatter, CoverImage, BlogTitle } from '../components'

const BlogHeader = ({ title, coverImage, date, published, tags }) => {
  return (
    <>
      <div className="level">
        <div className="level-item level-left">
          <BlogTitle>{title}</BlogTitle>
        </div>
        <div className="level-item level-right">
          <div className="tags">
            {tags.map((tag) => (
              <div key={tag} className="tag is-primary">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      {!published && (
        <div className="message is-danger">
          <div className="message-header">
            <p className="mx-auto">This blog has not been published yet.</p>
          </div>
        </div>
      )}
      <div className="mb-8">
        <CoverImage title={title} src={coverImage} height={620} width={1240} />
      </div>
      <div className="mx-auto">
        <div className="is-size-5">
          <DateFormatter date={date} />
        </div>
      </div>
    </>
  )
}

export default BlogHeader
