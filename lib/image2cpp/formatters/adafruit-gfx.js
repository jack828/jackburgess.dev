const adafruitGfx = (files, options, dataType) => {
  let output = ''

  // bitmap
  let useGlyphs = 0
  files.forEach((file) => {
    const { convertedData, canvas, glyph } = file
    const code = '\t' + convertedData.split('\n').join('\n\t') + '\n'
    const comment =
      "\t// '" + glyph + ', ' + canvas.width + 'x' + canvas.height + 'px\n'
    output += comment + code
    if (glyph.length === 1) useGlyphs++
  })

  output = output.replace(/,\s*$/, '')
  output =
    'const unsigned char ' +
    options.identifier +
    'Bitmap' +
    ' [] PROGMEM = {' +
    '\n' +
    output +
    '\n};\n\n' +
    'const GFXbitmapGlyph ' +
    options.identifier +
    'Glyphs [] PROGMEM = {\n'

  let offset = 0
  let code = ''

  // GFXbitmapGlyph
  files.forEach((file, i) => {
    const { canvas, glyph } = file
    code +=
      '\t{ ' +
      offset +
      ', ' +
      canvas.width +
      ', ' +
      canvas.height +
      ', ' +
      options.xAdvance +
      ', ' +
      "'" +
      (files.length === useGlyphs
        ? glyph
        : String.fromCharCode(options.firstAsciiChar + 1)) +
      "'" +
      ' }'
    if (i !== files.length - 1) {
      code += ','
    }
    code += "// '" + glyph + "'\n"
    offset += canvas.width
  })
  code += '};\n'
  output += code

  // GFXbitmapFont
  output +=
    '\nconst GFXbitmapFont ' +
    options.identifier +
    'Font PROGMEM = {\n' +
    '\t(uint8_t *)' +
    options.identifier +
    'Bitmap,\n' +
    '\t(GFXbitmapGlyph *)' +
    options.identifier +
    'Glyphs,\n' +
    '\t' +
    files.length +
    '\n};\n'
  return output
}

export default adafruitGfx
