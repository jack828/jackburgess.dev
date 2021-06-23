import Head from 'next/head'
import Footer from '../components/footer'
import '../styles/globals.scss'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default App
