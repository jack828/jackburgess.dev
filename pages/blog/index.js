import Head from 'next/head'
import { Layout, Container, MoreBlogs, HeroBlog } from '../../components'
import { getAllBlogs } from '../../lib/api'

const Index = ({ allBlogs }) => {
  const [heroBlog, ...blogs] = allBlogs
  return (
    <Layout>
      <Head>
        <title>Jack Burgess | Blog</title>
      </Head>
      <Container>
        <h1 className="title pt-4">Blogs</h1>
        <p>
          Sometimes I&lsquo;ll have a good idea and it&lsquo;ll end up here!
        </p>
        {heroBlog && <HeroBlog {...heroBlog} />}
        {blogs.length > 0 && <MoreBlogs blogs={blogs} />}
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const allBlogs = getAllBlogs([
    'title',
    'sell',
    'date',
    'slug',
    'tags',
    'author',
    'coverImage'
  ])

  return {
    props: { allBlogs }
  }
}

export default Index
