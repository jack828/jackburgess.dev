const sharp = require('sharp')

const logo = './data/logo.svg'
const outdir = './public/static/favicons'

const main = async () => {
  const process = async (size, format = 'png') =>
    sharp(logo)
      .pipelineColourspace('rgb8')
      .resize({ width: size, height: size, fit: 'inside' })
      .toFile(`${outdir}/favicon-${size}.${format}`)

  const sizes = [32, 57, 76, 96, 120, 128, 152, 180, 192, 196, 228]
  for (let size of sizes) {
    await process(size).then(() => console.log(`Created favicon-${size}.png`))
  }
}

main()
