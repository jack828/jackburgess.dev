import Head from 'next/head'

const Meta = ({ title, description, image, type }) => {
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
      <meta property="og:image:width" content={image ? '1920' : '1536'} />
      <meta property="og:image:height" content={image ? '1080' : '1536'} />
      <meta name="og:description" content={description} />
      <meta property="og:type" content={type || 'website'} />
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
