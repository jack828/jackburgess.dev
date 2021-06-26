import Head from 'next/head'

const Meta = ({ title, description, image }) => {
  return (
    <Head>
      <title>
        {title ? `${title} | Jack Burgess` : 'Jack Burgess | Software Engineer'}
      </title>
      <meta name="description" content={description} />
      <meta
        property="og:image"
        content={
          image
            ? image.startsWith('https://')
              ? image
              : `https://jackburgess.dev/${image}`
            : 'https://jackburgess.dev/profile-picture.jpeg'
        }
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  )
}

export default Meta
