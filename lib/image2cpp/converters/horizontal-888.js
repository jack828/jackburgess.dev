const horizontal888 = (data, canvasWidth, canvasHeight) => {
  // Output the image as a string for rgb888 displays (horizontally)
  var output_string = ''
  var output_index = 0

  // format is RGBA, so move 4 steps per pixel
  for (var index = 0; index < data.length; index += 4) {
    // Get the RGB values
    var r = data[index]
    var g = data[index + 1]
    var b = data[index + 2]
    // calculate the 565 color value
    var rgb = (r << 16) | (g << 8) | b
    // Split up the color value in two bytes
    var firstByte = (rgb >> 8) & 0xff
    var secondByte = rgb & 0xff

    var byteSet = rgb.toString(16)
    while (byteSet.length < 8) {
      byteSet = '0' + byteSet
    }
    output_string += '0x' + byteSet + ', '

    // add newlines every 16 bytes
    output_index++
    if (output_index >= canvasWidth) {
      output_string += '\n'
      output_index = 0
    }
  }
  return output_string
}

horizontal888.dataType = 'unsigned long'

export default horizontal888
