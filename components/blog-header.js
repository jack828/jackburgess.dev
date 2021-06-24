import { DateFormatter, CoverImage, BlogTitle } from '../components'

const BlogHeader = ({ title, coverImage, date }) => {
  return (
    <>
      <BlogTitle>{title}</BlogTitle>
      <div className="mb-8">
        <CoverImage title={title} src={coverImage} height={620} width={1240} />
      </div>
      <div className="mx-auto">
        <div className="mb-6 is-size-5">
          <DateFormatter date={date} />
        </div>
      </div>
    </>
  )
}

export default BlogHeader
