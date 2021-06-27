import Head from 'next/head'

const Meta = ({ title, description, image, type, date }) => {
  const imageUrl = image
    ? image.startsWith('https://')
      ? image
      : `https://jackburgess.dev${image}`
    : 'https://jackburgess.dev/profile-picture.jpeg'
  return (
    <Head>
      <title>
        {title ? `${title} | Jack Burgess` : 'Jack Burgess | Software Engineer'}
      </title>

      {/* General */}
      <meta name="author" content="Jack Burgess" />
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:author" content="Jack Burgess" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={image ? '1920' : '1536'} />
      <meta property="og:image:height" content={image ? '1080' : '1536'} />
      {date && <meta property="og:published_time" content={date} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@jackmburgess" />
      <meta name="twitter:creator" content="@jackmburgess" />
      <meta name="twitter:image" content={imageUrl} />

      {/* Icons */}
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
