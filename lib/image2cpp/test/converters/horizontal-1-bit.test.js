const assert = require('assert')
const createImageData = require('../lib/image-data-helper')
const converter = require('../../converters/horizontal-1-bit')

describe('#Horizontal 1 Bit Converter', () => {
  it('should convert data correctly', () => {
    assert.strictEqual(
      converter(
        createImageData(__dirname + '/../lib/images/checkered.dat'),
        8,
        8,
        { threshold: 128 }
      ),
      '0xaa, 0x55, 0xaa, 0x55, 0xaa, 0x55, 0xaa, 0x55, '
    )
  })
})
