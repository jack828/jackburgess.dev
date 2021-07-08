import { Navbar } from './'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="section">{children}</div>
    </>
  )
}

export default Layout
