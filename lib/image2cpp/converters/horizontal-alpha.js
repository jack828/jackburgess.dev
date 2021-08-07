const horizontalAlpha = (data, canvasWidth, canvasHeight, options) => {
  // Output the alpha mask as a string for horizontally drawing displays
  var output_string = ''
  var output_index = 0

  var byteIndex = 7
  var number = 0

  // format is RGBA, so move 4 steps per pixel
  for (var index = 0; index < data.length; index += 4) {
    // Get alpha part of the image data
    var alpha = data[index + 3]
    if (alpha > options.threshold) {
      number += Math.pow(2, byteIndex)
    }
    byteIndex--

    // if this was the last pixel of a row or the last pixel of the
    // image, fill up the rest of our byte with zeros so it always contains 8 bits
    if (
      (index != 0 && (index / 4 + 1) % canvasWidth == 0) ||
      index == data.length - 4
    ) {
      byteIndex = -1
    }

    // When we have the complete 8 bits, combine them into a hex value
    if (byteIndex < 0) {
      var byteSet = number.toString(16)
      if (byteSet.length == 1) {
        byteSet = '0' + byteSet
      }
      var b = '0x' + byteSet
      output_string += b + ', '
      output_index++
      if (output_index >= 16) {
        output_string += '\n'
        output_index = 0
      }
      number = 0
      byteIndex = 7
    }
  }
  return output_string
}

horizontalAlpha.dataType = 'unsigned char'

export default horizontalAlpha
