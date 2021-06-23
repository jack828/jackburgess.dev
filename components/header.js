import Link from 'next/link'

export default function Header() {
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
