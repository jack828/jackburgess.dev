const arduino = (files, options, dataType) => {
  let output = ''
  let varQuickArray = []
  let bytesUsed = 0

  files.forEach((file) => {
    const { convertedData, canvas, glyph } = file
    // Trim whitespace from end and remove trailing comma
    let code = convertedData.replace(/,\s*$/, '')

    code = '\t' + code.split('\n').join('\n\t') + '\n'
    // var variableCount = imageData.length() > 1 ? count++ : ''
    const comment =
      "// '" + glyph + "', " + canvas.width + 'x' + canvas.height + 'px\n'
    bytesUsed += code.split('\n').length * 16 // 16 bytes per line.

    let varname = options.identifier + glyph.replace(/[^a-zA-Z0-9]/g, '_')
    varQuickArray.push(varname)
    code =
      comment +
      'const ' +
      dataType +
      ' ' +
      varname +
      ' [] PROGMEM = {\n' +
      code +
      '};\n'
    output += code
  })
  // --TODO why
  varQuickArray.sort()
  // --
  output +=
    '\n// Array of all bitmaps for convenience. (Total bytes used to store images in PROGMEM = ' +
    bytesUsed +
    ')\n'
  output +=
    'const int ' +
    (options.identifier + 'allArray_LEN') +
    ' = ' +
    varQuickArray.length +
    ';\n'
  output +=
    'const ' +
    dataType +
    '* ' +
    (options.identifier + 'allArray') +
    '[' +
    varQuickArray.length +
    '] = {\n\t' +
    varQuickArray.join(',\n\t') +
    '\n};\n'
  return output
}

export default arduino
