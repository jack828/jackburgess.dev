const fs = require('fs')

const createImageData = (path) => {
  const rawData = fs.readFileSync(path, 'utf8').replace(/\n/g, '')
  const data = Uint8ClampedArray.from(rawData.split(','))
  return data
}

module.exports = createImageData
