import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import {
  Layout,
  Container,
  BlogHeader,
  BlogBody,
  BlogTitle
} from '../../components'
import { getBlogBySlug, getAllBlogs } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'

export default function Blog({ blog, moreBlogs }) {
  const router = useRouter()
  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Container fluid>
        {router.isFallback ? (
          <BlogTitle>Loading…</BlogTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{blog.title} | Jack Burgess</title>
                <meta property="og:image" content={blog.ogImage.url} />
              </Head>
              <BlogHeader {...blog} />
              <BlogBody {...blog} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const blog = getBlogBySlug(params.slug)
  const content = await markdownToHtml(blog.content || '')

  return {
    props: {
      blog: {
        ...blog,
        content
      }
    }
  }
}

export async function getStaticPaths() {
  const blogs = getAllBlogs(['slug'])

  return {
    paths: blogs.map((blog) => {
      return {
        params: {
          slug: blog.slug
        }
      }
    }),
    fallback: false
  }
}
