import Head from 'next/head'
import {
  Layout,
  Container,
  BlogTitle,
  HeroBlog,
  MoreBlogs,
  AllBlogs
} from '../../components'
import { getAllBlogs } from '../../lib/api'

const Index = ({ allBlogs }) => {
  const [heroBlog, ...blogs] = allBlogs
  const moreBlogs = blogs.slice(0, 2)
  return (
    <Layout>
      <Head>
        <title>Jack Burgess | Blog</title>
      </Head>
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
        {moreBlogs.length > 0 && <MoreBlogs blogs={moreBlogs} />}
        {allBlogs.length > 0 && <AllBlogs blogs={allBlogs} />}
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
      'author',
      'coverImage',
      'coverImageSquare'
    ]
  })

  return {
    props: { allBlogs }
  }
}

export default Index
