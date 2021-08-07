const plain = (files, options, dataType) => {
  let output = []

  files.forEach(function (file) {
    const { convertedData, canvas, glyph } = file
    var comment = glyph
      ? "// '" + glyph + "', " + canvas.width + 'x' + canvas.height + 'px\n'
      : ''
    // if (image.img != images.first().img) comment = '\n' + comment
    output.push(comment + convertedData)
  })
  // Trim whitespace from end and remove trailing comma
  // output_string = output_string.replace(/,\s*$/g, '')
  return output.join('\n')
}

export default plain
