const arduinoSingle = (files, options, dataType) => {
  let output = ''

  files.forEach((file) => {
    const { convertedData, canvas, glyph } = file
    const code = '\t' + convertedData.split('\n').join('\n\t') + '\n'
    const comment =
      "\t// '" + glyph + ', ' + canvas.width + 'x' + canvas.height + 'px\n'
    output += comment + code
  })

  output = output.replace(/,\s*$/, '')

  output =
    'const ' +
    dataType +
    ' ' +
    options.identifier +
    ' [] PROGMEM = {' +
    '\n' +
    output +
    '\n};'
  return output
}

export default arduinoSingle
