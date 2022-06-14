// #!/usr/bin/env bash
// # Requires both graphicsmagick and imagemagick

// LOGO=./data/logo.svg

// OUTDIR=./public/static

// gm convert -depth 8 -size 96x96 -background none $LOGO "$OUTDIR/favicons/android-chrome-96x96.png"
// gm convert -depth 8 -size 76x76 -background none $LOGO "$OUTDIR/favicons/apple-touch-icon.png"
// gm convert -depth 8 -size 16x16 -background none $LOGO "$OUTDIR/favicons/favicon-16x16.png"
// gm convert -depth 8 -size 32x32 -background none $LOGO "$OUTDIR/favicons/favicon-32x32.png"
// gm convert -depth 8 -size 150x150 -background none $LOGO "$OUTDIR/favicons/mstile-150x150.png"
// convert -depth 8 -size 48x48 -background none $LOGO "$OUTDIR/favicons/favicon.ico"
//
const sharp = require('sharp')

const logo = './data/logo.svg'
const outdir = './public/static'

const main = async () => {
  const process = async (width, height, filename) =>
    sharp(logo)
      .pipelineColourspace('rgb8')
      .resize({ width, height, fit: 'inside' })
      .toFile(`${outdir}/${filename}`)

  const sizes = [32, 57, 76, 96, 120, 128, 144, 152, 180, 192, 196, 228]
  for (let size of sizes) {
    await process(size)
  }
}

main()

/*
*<link rel="icon" href="/path/to/favicon-32.png" sizes="32x32">
<link rel="icon" href="/path/to/favicon-57.png" sizes="57x57">
<link rel="icon" href="/path/to/favicon-76.png" sizes="76x76">
<link rel="icon" href="/path/to/favicon-96.png" sizes="96x96">
<link rel="icon" href="/path/to/favicon-128.png" sizes="128x128">
<link rel="icon" href="/path/to/favicon-192.png" sizes="192x192">
<link rel="icon" href="/path/to/favicon-228.png" sizes="228x228">

<!-- Android -->
<link rel="shortcut icon" sizes="196x196" href=“/path/to/favicon-196.png">

<!-- iOS -->
<link rel="apple-touch-icon" href="/path/to/favicon-120.png" sizes="120x120">
<link rel="apple-touch-icon" href="path/to/favicon-152.png" sizes="152x152">
<link rel="apple-touch-icon" href="path/to/favicon-180.png" sizes="180x180">

<!-- Windows 8 IE 10-->
<meta name="msapplication-TileColor" content="#FFFFFF">
<meta name="msapplication-TileImage" content="/path/to/favicon-144.png">
*/
