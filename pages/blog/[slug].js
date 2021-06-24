import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../components/layout'
import Container from '../../components/container'
import BlogBody from '../../components/blog-body'
import BlogHeader from '../../components/blog-header'
import { getBlogBySlug, getAllBlogs } from '../../lib/api'
import BlogTitle from '../../components/blog-title'
import Head from 'next/head'
import markdownToHtml from '../../lib/markdownToHtml'

export default function Blog({ blog, moreBlogs }) {
  const router = useRouter()
  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <BlogTitle>Loading…</BlogTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{blog.title} | Jack Burgess</title>
                <meta property="og:image" content={blog.ogImage.url} />
              </Head>
              <BlogHeader {...blog} />
              <BlogBody content={blog.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const blog = getBlogBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage'
  ])
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
