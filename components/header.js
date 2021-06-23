import Link from 'next/link'

const Header = () => {
  return (
    <h2 className="">
      <Link href="/">
        <a className="">Home</a>
      </Link>
      <Link href="/blog">
        <a className="">Blog</a>
      </Link>
    </h2>
  )
}

export default Header
