import {
  Layout,
  Container,
  Meta,
  BlogTitle,
  HeroBlog,
  AllBlogs
} from '../../components'
import { getAllBlogs } from '../../lib/api'

const Index = ({ allBlogs }) => {
  const [heroBlog, ...blogs] = allBlogs
  return (
    <Layout>
      <Meta
        title="Blog"
        description="A raw stream of information about programming topics - Node.JS, JavaScript, React, React Native, C, and ESP32."
      />
      <Container>
        <BlogTitle>Blogs</BlogTitle>
        <p>
          Sometimes I&lsquo;ll have a good idea and it&lsquo;ll end up here!
        </p>
        {allBlogs.length === 0 && (
          <p className="subtitle">
            It appears I haven&lsquo;t written anything yet…
          </p>
        )}
        {heroBlog && <HeroBlog blog={heroBlog} />}
        {blogs.length > 0 && <AllBlogs blogs={blogs} />}
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const allBlogs = getAllBlogs({
    fields: [
      'title',
      'sell',
      'date',
      'slug',
      'tags',
      'coverImage',
      'coverImageSquare'
    ]
  })

  return {
    props: { allBlogs }
  }
}

export default Index
