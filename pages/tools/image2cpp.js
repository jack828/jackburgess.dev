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
          byte arrays (and vice versa) for use with Arduino, ESP32, SMT32, etc
          and colour or monochrome displays.
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
        <div className="columns">
          <div className="column">
            <p className="is-size-3">1. Select Image</p>
          </div>
          <div className="column is-narrow">
            <p className="is-size-3">or</p>
          </div>
          <div className="column">
            <p className="is-size-3">1. Paste Byte Array</p>
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
                    <input type="radio" name="backgroundColour" /> White
                  </label>
                  <label className="radio">
                    <input type="radio" name="backgroundColour" /> Black
                  </label>
                  <label className="radio">
                    <input type="radio" name="backgroundColour" /> Transparent
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
                    <input type="checkbox" />
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
                    placeholder=""
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
                    <select>
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
                    <input type="checkbox" /> Horizontally
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" /> Vertically
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
                    <input type="checkbox" /> Rotate 180 degrees
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
                    <input type="checkbox" /> Horizontally
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" /> Vertically
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
              <label className="label">Scaling</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <div className="select is-fullwidth">
                    <select>
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

                <p className="help" data-caption="arduino">
                  Adds some extra Arduino code around the output for easy
                  copy-paste into
                  <a
                    href="https://github.com/javl/image2cpp/blob/master/oled_example/oled_example.ino"
                    target="_blank"
                  >
                    this example
                  </a>
                  . If multiple images are loaded, generates a byte array for
                  each and appends a counter to the identifier.
                </p>
                <p className="help" data-caption="arduino_single">
                  Adds some extra Arduino code around the output for easy
                  copy-paste. If multiple images are loaded, generates a single
                  byte array.
                </p>
                <p className="help" data-caption="adafruit_gfx">
                  Creates a <code>GFXbitmapFont</code> formatted ouput. Used by
                  a modified version of the Adafruit GFX library. GitHub project
                  and example
                  <a
                    href="https://github.com/wiredolphin/Adafruit-GFX-Library/tree/bitmap-font"
                    target="_blank"
                  >
                    here
                  </a>
                  .
                  <br />
                  <i>First ASCII character</i> value is used only if a glyph
                  identifier of length equal to 1 is not provided for each
                  image. The value itself will be incremented by 1 for each
                  glyph.
                </p>
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
                  <input className="input" type="text" placeholder="Name" />
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
                  <input className="input" type="text" placeholder="Name" />
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
                  <input className="input" type="text" placeholder="Name" />
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
                    <select>
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
      </Container>
    </Layout>
  )
}

export default Image2Cpp
