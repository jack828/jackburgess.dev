import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import {
  Layout,
  Container,
  Meta,
  BlogTitle,
  BlogHeader,
  BlogBody,
  BlogFooter,
  BlogNavigation
} from '../../components'
import { getBlogBySlug, getAllBlogs } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'

export default function Blog({ blog, navBlogs }) {
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
            <article>
              <Meta
                title={blog.title}
                description={blog.sell}
                image={blog.coverImage}
                type="article"
                date={blog.date}
              />
              <BlogHeader {...blog} />
              <BlogBody {...blog} />
              <BlogFooter {...blog} />
              <BlogNavigation blogs={navBlogs} />
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

  const blogs = getAllBlogs({ fields: ['slug'] })

  const index = blogs.findIndex(({ slug }) => slug === params.slug)

  const navBlogs = [blogs[index - 1], blogs[index + 1]].map(
    (navBlog) =>
      (navBlog &&
        navBlog.slug &&
        getBlogBySlug(navBlog.slug, [
          'title',
          'sell',
          'date',
          'slug',
          'tags',
          'coverImage'
        ])) ||
      null
  )
  return {
    props: {
      blog: {
        ...blog,
        content
      },
      navBlogs
    }
  }
}

export async function getStaticPaths() {
  const blogs = getAllBlogs({ fields: ['slug'] })

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
