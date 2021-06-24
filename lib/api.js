import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const blogsDirectory = join(process.cwd(), '_blogs')

const getBlogSlugs = () => {
  // TODO filter published
  return fs.readdirSync(blogsDirectory)
}

const getBlogBySlug = (slug, fields) => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(blogsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  let blogData = {}

  if (!fields) {
    blogData = {
      slug: realSlug,
      content,
      ...data
    }
  } else {
    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === 'slug') {
        blogData[field] = realSlug
      }
      if (field === 'content') {
        blogData[field] = content
      }

      if (data[field]) {
        blogData[field] = data[field]
      }
    })
  }

  return blogData
}

const getAllBlogs = (fields = []) => {
  const slugs = getBlogSlugs()
  let blogs = slugs
    .map((slug) => getBlogBySlug(slug, ['published', ...fields]))
    // sort blogs by date in descending order
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  if (process.env.NODE_ENV === 'production') {
    blogs = blogs.filter((blog) => blog.published)
  }
  return blogs
}

export { getBlogSlugs, getBlogBySlug, getAllBlogs }
