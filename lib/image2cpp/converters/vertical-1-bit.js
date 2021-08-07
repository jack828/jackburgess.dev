const vertical1bit = (data, canvasWidth, canvasHeight, options) => {
  // Output the image as a string for vertically drawing displays
  var output_string = ''
  var output_index = 0

  for (var p = 0; p < Math.ceil(options.screenHeight / 8); p++) {
    for (var x = 0; x < options.screenWidth; x++) {
      var byteIndex = 7
      var number = 0

      for (var y = 7; y >= 0; y--) {
        var index = (p * 8 + y) * (options.screenWidth * 4) + x * 4
        var avg = (data[index] + data[index + 1] + data[index + 2]) / 3
        if (avg > options.threshold) {
          number += Math.pow(2, byteIndex)
        }
        byteIndex--
      }
      var byteSet = number.toString(16)
      if (byteSet.length == 1) {
        byteSet = '0' + byteSet
      }
      var b = '0x' + byteSet.toString(16)
      output_string += b + ', '
      output_index++
      if (output_index >= 16) {
        output_string += '\n'
        output_index = 0
      }
    }
  }
  return output_string
}

vertical1bit.dataType = 'unsigned char'

export default vertical1bit
