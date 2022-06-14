const sharp = require('sharp')
const fs = require('fs/promises')
const toIco = require('to-ico')

const logo = './data/logo.svg'
const outdir = './public'

const generateFavicon = async (sourcePath, destPath) => {
  const image = await fs.readFile(sourcePath)

  const icoFile = await toIco([image], {
    sizes: [16, 32, 48],
    resize: true
  })
  await fs.writeFile(destPath, icoFile)
}

const main = async () => {
  const process = async (size) =>
    sharp(logo)
      .pipelineColourspace('rgb8')
      .resize({ width: size, height: size, fit: 'inside' })
      .toFile(`${outdir}/static/favicons/favicon-${size}.png`)

  const sizes = [32, 57, 76, 96, 120, 128, 152, 180, 192, 196, 228, 512]
  for (let size of sizes) {
    await process(size).then(() => console.log(`Created favicon-${size}.png`))
  }

  await fs.copyFile(logo, `${outdir}/static/favicons/favicon.svg`)

  await generateFavicon(
    `${outdir}/static/favicons/favicon-128.png`,
    `${outdir}/favicon.ico`
  ).then(() => console.log(`Created favicon.ico`))
}

main()
