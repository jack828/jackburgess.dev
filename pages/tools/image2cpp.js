import { useState } from 'react'
import {
  Layout,
  Container,
  Meta,
  BlogTitle,
  ExternalLink,
  MoreBlogs,
  AllBlogs
} from '../../components'

const Image2Cpp = () => {
  const [options, setOptions] = useState({
    backgroundColour: 'white',
    invertColours: false,
    threshold: '1',
    scale: '1',
    centerHorizontally: false,
    centerVertically: false,
    rotate180: false,
    flipHorizontally: false,
    flipVertically: false,
    format: 'plain',
    firstAsciiChar: '48',
    xAdvance: '0',
    identifier: '__bitmap__',
    drawMode: 'horizontal1bit'
  })
  const handleChange = ({ target: { type, name, value, checked } }) =>
    setOptions((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }))

  return (
    <Layout>
      <Meta
        title="image2cpp"
        description="Useful (hopefully) libraries I've made or want to showcase for a variety of things - Node.JS, JavaScript, React, React Native, C, and ESP32."
      />
      <Container>
        <BlogTitle>Image2Cpp</BlogTitle>
        <p>
          image2cpp is a simple (yet feature rich) tool to change image into
          byte arrays (and modify byte arrays) for use with Arduino, ESP32,
          SMT32, etc and colour or monochrome displays.
        </p>
        <p>
          This is based on the work by{' '}
          <ExternalLink href="https://github.com/javl">javl</ExternalLink>. Them
          and the original authors are credited here:{' '}
          <ExternalLink href="https://github.com/javl">javl</ExternalLink>,{' '}
          <ExternalLink href="https://github.com/akumpf">akumpf</ExternalLink>,{' '}
          <ExternalLink href="https://github.com/davidalim">
            davidalim
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://github.com/hurricaneJoef">
            hurricaneJoef
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://github.com/jochenderwae">
            jochenderwae
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://github.com/Sebski123">
            Sebski123
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://github.com/whoisnian">
            whoisnian
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://github.com/wiredolphin">
            wiredolphin
          </ExternalLink>
          .
        </p>

        <hr />

        <div className="columns">
          <div className="column">
            <p className="is-size-3">1. Select Image</p>

            <div className="file is-centered has-name is-boxed">
              <label className="file-label">
                <input className="file-input" type="file" name="resume" />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Choose a file…</span>
                </span>
                <span className="file-name">filename.bmp</span>
              </label>
            </div>
          </div>
          <div className="column is-narrow">
            <p className="is-size-3">or</p>
          </div>
          <div className="column">
            <p className="is-size-3">1. Paste Byte Array</p>
            <p className="is-size-4">TODO</p>
          </div>
        </div>

        <hr />

        <p className="is-size-3">2. Image Settings</p>

        <div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Canvas Size(s)</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded">
                  <input className="input" type="text" placeholder="Name" />
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label">
              <label className="label">Background Colour</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <label className="radio">
                    <input
                      type="radio"
                      name="backgroundColour"
                      value="white"
                      onChange={handleChange}
                      defaultChecked={options.backgroundColour === 'white'}
                    />{' '}
                    White
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="backgroundColour"
                      value="black"
                      onChange={handleChange}
                      defaultChecked={options.backgroundColour === 'black'}
                    />{' '}
                    Black
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="backgroundColour"
                      value="transparent"
                      onChange={handleChange}
                      defaultChecked={
                        options.backgroundColour === 'transparent'
                      }
                    />{' '}
                    Transparent
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Invert Image Colours</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name="invertColours"
                      onChange={handleChange}
                      defaultChecked={options.invertColours}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Brightness / Alpha Threshold</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="number"
                    min="0"
                    max="255"
                    name="threshold"
                    onChange={handleChange}
                    defaultValue={options.invertColours}
                  />
                </p>
                <p className="help">
                  0 - 255; if the brightness of a pixel is above the given level
                  the pixel becomes white, otherwise they become black. When
                  using alpha, opaque and transparent are used instead.
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Scaling</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      name="scale"
                      onChange={handleChange}
                      defaultValue={options.scale}
                    >
                      <option value="1">original size</option>
                      <option value="2">
                        scale to fit, keeping proportions
                      </option>
                      <option value="3">stretch to fill canvas</option>
                      <option value="4">
                        stretch to fill canvas horizontally
                      </option>
                      <option value="5">
                        stretch to fill canvas vertically
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Centre</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name="centerHorizontally"
                      onChange={handleChange}
                      defaultChecked={options.centerHorizontally}
                    />{' '}
                    Horizontally
                  </label>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name="centerVertically"
                      onChange={handleChange}
                      defaultChecked={options.centerVertically}
                    />{' '}
                    Vertically
                  </label>
                </div>
                <p className="help">
                  Only works when using a canvas larger than the original image.
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Rotate Image</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name="rotate180"
                      onChange={handleChange}
                      defaultChecked={options.rotate180}
                    />{' '}
                    Rotate 180 degrees
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Flip</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name="flipHorizontally"
                      onChange={handleChange}
                      defaultChecked={options.flipHorizontally}
                    />{' '}
                    Horizontally
                  </label>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name="flipVertically"
                      onChange={handleChange}
                      defaultChecked={options.flipVertically}
                    />{' '}
                    Vertically
                  </label>
                </div>
                <p className="help">
                  Only works when using a canvas larger than the original image.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <p className="is-size-3">3. Preview</p>

        <hr />

        <p className="is-size-3">3. Output</p>

        <div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Format</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <div className="select">
                    <select
                      name="format"
                      onChange={handleChange}
                      defaultValue={options.format}
                    >
                      <option value="plain">plain bytes</option>
                      <option value="arduino">Arduino code</option>
                      <option value="arduino_single">
                        Arduino code, single bitmap
                      </option>
                      <option value="adafruit_gfx">
                        Adafruit GFXbitmapFont
                      </option>
                    </select>
                  </div>
                </div>
                <p className="help"></p>

                {options.format === 'arduino' && (
                  <p className="help" data-caption="arduino">
                    Adds some extra Arduino code around the output for easy
                    copy-paste into
                    <ExternalLink href="https://github.com/javl/image2cpp/blob/master/oled_example/oled_example.ino">
                      this example
                    </ExternalLink>
                    . If multiple images are loaded, generates a byte array for
                    each and appends a counter to the identifier.
                  </p>
                )}

                {options.format === 'arduino_single' && (
                  <p className="help" data-caption="arduino_single">
                    Adds some extra Arduino code around the output for easy
                    copy-paste. If multiple images are loaded, generates a
                    single byte array.
                  </p>
                )}
                {options.format === 'adafruit_gfx' && (
                  <p className="help" data-caption="adafruit_gfx">
                    Creates a <code>GFXbitmapFont</code> formatted ouput. Used
                    by a modified version of the Adafruit GFX library. GitHub
                    project and example
                    <ExternalLink href="https://github.com/wiredolphin/Adafruit-GFX-Library/tree/bitmap-font">
                      here
                    </ExternalLink>
                    .
                    <br />
                    <i>First ASCII character</i> value is used only if a glyph
                    identifier of length equal to 1 is not provided for each
                    image. The value itself will be incremented by 1 for each
                    glyph.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label">
              <label className="label">First ASCII character (dec)</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    name="firstAsciiChar"
                    onChange={handleChange}
                    defaultValue={options.firstAsciiChar}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label">
              <label className="label">X advance</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    name="xAdvance"
                    onChange={handleChange}
                    defaultValue={options.xAdvance}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label">
              <label className="label">Identifier/prefix</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    name="identifier"
                    onChange={handleChange}
                    defaultValue={options.identifier}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Draw mode</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      name="drawMode"
                      onChange={handleChange}
                      defaultValue={options.drawMode}
                    >
                      <option value="horizontal1bit">
                        Horizontal - 1 bit per pixel
                      </option>
                      <option value="vertical1bit">
                        Vertical - 1 bit per pixel
                      </option>
                      <option value="horizontal565">
                        Horizontal - 2 bytes per pixel (RGB565)
                      </option>
                      <option value="horizontalAlpha">
                        Horizontal - 1 bit per pixel alpha map
                      </option>
                      <option value="horizontal888">
                        Horizontal - 3 bytes per pixel (RGB888)
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="control mb-3">
            <button className="button is-primary">Generate</button>
          </div>
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Code goes here"
                rows="10"
                readOnly
              />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default Image2Cpp
