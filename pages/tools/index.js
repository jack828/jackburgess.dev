import Link from 'next/link'
import { Layout, Container, Meta, BlogTitle } from '../../components'

const Index = () => {
  return (
    <Layout>
      <Meta
        title="Tools"
        description="Useful (hopefully) libraries I've made or want to showcase for a variety of things - Node.JS, JavaScript, React, React Native, C, and ESP32."
      />
      <Container>
        <BlogTitle>Tools</BlogTitle>
        <p>
          Sometimes I&lsquo;ll have a good idea and it&lsquo;ll end up here!
        </p>
        <Link href="/tools/image2cpp" passHref>
          <a className="subtitle">Image2cpp</a>
        </Link>
      </Container>
    </Layout>
  )
}

export default Index
