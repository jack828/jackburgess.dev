import Head from 'next/head'
import {
  Layout,
  Container,
  BlogTitle,
  MoreBlogs,
  HeroBlog
} from '../../components'
import { getAllBlogs } from '../../lib/api'

const Index = ({ allBlogs }) => {
  const [heroBlog, ...blogs] = allBlogs
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
        {blogs.length > 0 && <MoreBlogs blogs={blogs} />}
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const allBlogs = getAllBlogs({
    fields: ['title', 'sell', 'date', 'slug', 'tags', 'author', 'coverImage'],
    limit: 3
  })

  return {
    props: { allBlogs }
  }
}

export default Index
