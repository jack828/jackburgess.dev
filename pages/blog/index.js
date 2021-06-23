import Container from '../../components/container'
import MoreBlogs from '../../components/more-blogs'
import HeroBlog from '../../components/hero-blog'
import { getAllBlogs } from '../../lib/api'
import Head from 'next/head'

export default function Index({ allBlogs }) {
  const [heroBlog, ...blogs] = allBlogs
  return (
    <>
      <Head>
        <title>Jack Burgess | Blog</title>
      </Head>
      <Container>
        Intro
        {heroBlog && <HeroBlog {...heroBlog} />}
        {blogs.length > 0 && <MoreBlogs blogs={blogs} />}
      </Container>
    </>
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
