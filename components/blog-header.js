import { DateFormatter, CoverImage, BlogTitle } from '../components'

const BlogHeader = ({ title, coverImage, date, published, tags }) => {
  return (
    <>
      <BlogTitle>{title}</BlogTitle>
      <div className="pb-4">
        <div className="tags">
          {tags.map((tag) => (
            <div key={tag} className="tag is-primary">
              {tag}
            </div>
          ))}
        </div>
      </div>
      {!published && (
        <div className="message is-danger">
          <div className="message-header">
            <p className="mx-auto">This blog has not been published yet.</p>
          </div>
        </div>
      )}
      <div className="box p-0">
        <CoverImage title={title} src={coverImage} height={720} width={1280} />
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
