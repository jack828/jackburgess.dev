import Layout from '../../components/layout'
import Container from '../../components/container'
import MoreBlogs from '../../components/more-blogs'
import HeroBlog from '../../components/hero-blog'
import { getAllBlogs } from '../../lib/api'
import Head from 'next/head'

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
        {false && heroBlog && <HeroBlog {...heroBlog} />}
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
    'author',
    'coverImage'
  ])

  return {
    props: { allBlogs }
  }
}

export default Index
