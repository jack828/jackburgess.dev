import { Navbar } from './'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar shadow />
      <div className="section">{children}</div>
    </>
  )
}

export default Layout
