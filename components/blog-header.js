import {
  DateFormatter,
  CoverImage,
  BlogTitle,
  ShareButtons
} from '../components'

const BlogHeader = ({ title, coverImage, date, published, tags }) => {
  return (
    <>
      <BlogTitle>{title}</BlogTitle>
      <div className="level">
        <div className="level-left">
          <div className="level-item is-size-5">
            <DateFormatter date={date} />
          </div>
        </div>
        <div className="level-item">
          <ShareButtons title={title} />
        </div>
        <div className="level-right">
          <div className="level-item">
            <div className="tags">
              {tags.map((tag) => (
                <div key={tag} className="tag is-primary">
                  {tag}
                </div>
              ))}
            </div>
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
      <div className="box p-0">
        <CoverImage title={title} src={coverImage} height={720} width={1280} />
      </div>
    </>
  )
}

export default BlogHeader
