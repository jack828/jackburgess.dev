const horizontal565 = (data, canvasWidth, canvasHeight) => {
  // Output the image as a string for 565 displays (horizontally)
  var output_string = ''
  var output_index = 0

  // format is RGBA, so move 4 steps per pixel
  for (var index = 0; index < data.length; index += 4) {
    // Get the RGB values
    var r = data[index]
    var g = data[index + 1]
    var b = data[index + 2]
    // calculate the 565 color value
    var rgb =
      ((r & 0b11111000) << 8) |
      ((g & 0b11111100) << 3) |
      ((b & 0b11111000) >> 3)
    // Split up the color value in two bytes
    var firstByte = (rgb >> 8) & 0xff
    var secondByte = rgb & 0xff

    var byteSet = rgb.toString(16)
    while (byteSet.length < 4) {
      byteSet = '0' + byteSet
    }
    output_string += '0x' + byteSet + ', '

    // add newlines every 16 bytes
    output_index++
    if (output_index >= 16) {
      output_string += '\n'
      output_index = 0
    }
  }
  return output_string
}

horizontal565.dataType = 'uint16_t'

export default horizontal565
