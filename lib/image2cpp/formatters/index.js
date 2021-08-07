import arduino from './arduino'
import arduinoSingle from './arduino-single'
import adafruitGfx from './adafruit-gfx'
import plain from './plain'

const formatters = {
  arduino,
  'arduino-single': arduinoSingle,
  'adafruit-gfx': adafruitGfx,
  plain
}

export default formatters
