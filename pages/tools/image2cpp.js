import { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import {
  Layout,
  Container,
  Meta,
  BlogTitle,
  ExternalLink
} from '../../components'
import converters from '../../lib/image2cpp/converters'
import formatters from '../../lib/image2cpp/formatters'

const Image2Cpp = () => {
  const [options, setOptions] = useState({
    backgroundColour: 'white',
    invertColours: false,
    threshold: '1',
    scale: 'original-size',
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
  const [files, setFiles] = useState([])
  const [hasFileTypeError, setHasFileTypeError] = useState(false)
  const [output, setOutput] = useState('')

  const handleChange = ({ target: { type, name, value, checked } }) =>
    setOptions((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }))

  const handleFilePropertyChange =
    (index) =>
    ({ target: { name, value } }) =>
      setFiles((prevState) => {
        prevState[index][name] = value
        return [...prevState]
      })

  const handleFileRemove = (index) => () =>
    setFiles((prevState) => {
      // TODO bet there's a better (more readable) way of doing this
      prevState[index] = null
      return [...prevState.filter(Boolean)]
    })

  const setFileRef = (i, ref) =>
    setFiles((prevState) => {
      prevState[i].canvas = ref
      return prevState
    })

  const handleFileUpload = ({ target: { files: inputFiles } }) => {
    setHasFileTypeError(false)

    Array.from(inputFiles).forEach((file) => {
      // Only process image files
      if (!file.type.match('image.*')) {
        setHasFileTypeError(true)
        return
      }

      const reader = new FileReader()

      // Get file data as data:image string
      reader.onload = ({ target: { result: data } }) => {
        // Load it as an Image element to get width & height
        const image = new Image()
        image.onload = () => {
          setFiles((prevState) => [
            ...prevState,
            {
              name: file.name,
              glyph: file.name.slice(0, file.name.lastIndexOf('.')),
              canvas: null,
              image,
              data,
              originalWidth: image.width,
              originalHeight: image.height,
              width: image.width,
              height: image.height
            }
          ])
        }
        image.src = data
      }
      reader.readAsDataURL(file)
    })
  }

  useEffect(() => {
    // update canvasses
    console.log('UPDATING CANVAS', files)
    files
      .filter(({ canvas }) => canvas)
      .forEach((file) => {
        const { canvas, image, originalWidth, originalHeight } = file
        const ctx = canvas.getContext('2d')
        console.log({ ctx })
        // Invert background if needed
        if (options.backgroundColour == 'transparent') {
          ctx.fillStyle = 'rgba(0,0,0,0.0)'
          ctx.globalCompositeOperation = 'copy'
        } else {
          if (options.invertColours) {
            options.backgroundColour == 'white'
              ? (ctx.fillStyle = 'black')
              : (ctx.fillStyle = 'white')
          } else {
            ctx.fillStyle = options.backgroundColour
          }
          ctx.globalCompositeOperation = 'source-over'
        }

        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.setTransform(1, 0, 0, 1, 0, 0) // start with identity matrix transform (no rotation).
        if (options.rotate180) {
          // Matrix transformation
          ctx.translate(canvas.width / 2.0, canvas.height / 2.0)
          ctx.rotate(Math.PI)
          ctx.translate(-canvas.width / 2.0, -canvas.height / 2.0)
        }

        // Offset used for centering the image when requested
        let offsetX = 0
        let offsetY = 0

        switch (options.scale) {
          case 'original-size':
            if (options.centerHorizontally) {
              offsetX = Math.round((canvas.width - originalWidth) / 2)
            }
            if (options.centerVertically) {
              offsetY = Math.round((canvas.height - originalHeight) / 2)
            }
            ctx.drawImage(
              image,
              0,
              0,
              originalWidth,
              originalHeight,
              offsetX,
              offsetY,
              originalWidth,
              originalHeight
            )
            break
          case 'scale':
            const horizontalRatio = canvas.width / originalWidth
            const verticalRatio = canvas.height / originalHeight
            const useRatio = Math.min(horizontalRatio, verticalRatio)

            if (options.centerHorizontally) {
              offsetX = Math.round(
                (canvas.width - originalWidth * useRatio) / 2
              )
            }
            if (options.centerVertically) {
              offsetY = Math.round(
                (canvas.height - originalHeight * useRatio) / 2
              )
            }
            ctx.drawImage(
              image,
              0,
              0,
              originalWidth,
              originalHeight,
              offsetX,
              offsetY,
              originalWidth * useRatio,
              originalHeight * useRatio
            )
            break
          case 'stretch-fill':
            ctx.drawImage(
              image,
              0,
              0,
              originalWidth,
              originalHeight,
              offsetX,
              offsetY,
              canvas.width,
              canvas.height
            )
            break
          case 'stretch-horizontally':
            offsetX = 0
            if (options.centerVertically) {
              Math.round((offsetY = (canvas.height - originalHeight) / 2))
            }
            ctx.drawImage(
              image,
              0,
              0,
              originalWidth,
              originalHeight,
              offsetX,
              offsetY,
              canvas.width,
              originalHeight
            )
            break
          case 'stretch-vertically':
            if (options.centerHorizontally) {
              offsetX = Math.round((canvas.width - originalWidth) / 2)
            }
            offsetY = 0
            ctx.drawImage(
              image,
              0,
              0,
              originalWidth,
              originalHeight,
              offsetX,
              offsetY,
              originalWidth,
              canvas.height
            )
            break
        }

        // Make sure the image is black and white
        if (
          options.drawMode == 'horizontal1bit' ||
          options.drawMode == 'vertical1bit'
        ) {
          // Make black & white
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data
          for (let i = 0; i < data.length; i += 4) {
            let avg = (data[i] + data[i + 1] + data[i + 2]) / 3
            avg = avg > options.threshold ? 255 : 0
            data[i] = avg // red
            data[i + 1] = avg // green
            data[i + 2] = avg // blue
          }
          ctx.putImageData(imageData, 0, 0)

          if (options.invertColours) {
            const imageData = ctx.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            )
            const data = imageData.data
            for (let i = 0; i < data.length; i += 4) {
              data[i] = 255 - data[i] // red
              data[i + 1] = 255 - data[i + 1] // green
              data[i + 2] = 255 - data[i + 2] // blue
            }
            ctx.putImageData(imageData, 0, 0)
          }
        }

        // Flip image if needed
        if (options.flipHorizontally) {
          ctx.save()
          ctx.scale(-1, 1)
          ctx.drawImage(canvas, -canvas.width, 0)
          ctx.restore()
        }
        if (options.flipVertically) {
          ctx.save()
          ctx.scale(1, -1)
          ctx.drawImage(canvas, 0, -canvas.height)
          ctx.restore()
        }
      })
  }, [
    files,
    options.backgroundColour,
    options.invertColours,
    options.rotate180,
    options.centerHorizontally,
    options.centerVertically,
    options.scale,
    options.drawMode,
    options.flipHorizontally,
    options.flipVertically,
    options.threshold
  ])

  const getImageData = (file) => {
    // extract raw image data
    var canvas = file.canvas
    var ctx = canvas.getContext('2d')

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var data = imageData.data
    return data
  }
  const handleGenerateOutput = (e) => {
    e.preventDefault()
    setOutput('')
    const converter = converters[options.drawMode]
    const imagesData = files.map(getImageData)
    const convertedFiles = files.map((file, i) => ({
      convertedData: converter(imagesData[i], file.canvas.width, file.canvas.height, options),
      ...file
    }))
    console.log({ converter, imagesData, convertedFiles })
    const formatter = formatters[options.format]
    setOutput(formatter(convertedFiles, options, converter.dataType))
  }

  console.log({ files })
  return (
    <Layout>
      <Meta
        title="image2cpp"
        description="Convert images into byte arrays for use in Arduino, Raspberry Pico, ESP32, etc."
      />
      <Container>
        <BlogTitle>image2Cpp</BlogTitle>
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
        <p>
          As the original work is GNU GPLv3 licensed, so is this. You can find
          the source code to this (and the entire site!) on{' '}
          <ExternalLink href="https://github.com/jack828/jackburgess.dev">
            the GitHub repository
          </ExternalLink>
          .
        </p>

        <p className="is-size-4 has-text-danger is-hidden-desktop">
          This tool has not been designed for mobile!
        </p>

        <hr />

        <div className="columns">
          <div className="column">
            <p className="is-size-3">1. Select Image</p>

            <div
              className={classnames('file is-centered has-name is-boxed', {
                'is-danger': hasFileTypeError
              })}
            >
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="files"
                  onChange={handleFileUpload}
                  multiple
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Choose a file…</span>
                </span>
                <span className="file-name">
                  {files.length === 0 ? (
                    'No file(s) chosen'
                  ) : (
                    <>
                      {files.length === 1
                        ? files[0].name
                        : `${files.length} files`}
                    </>
                  )}
                </span>
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
          {files.map((file, i) => (
            <div key={`File-${file.name}-${i}`} className="field is-horizontal">
              <div className="field-label is-normal">
                {i === 0 && <label className="label">Canvas Size(s)</label>}
              </div>
              <div className="field-body is-flex-direction-column">
                <div className="field is-grouped">
                  <p className="control">
                    {file.name} (file resolution {file.originalWidth} ×{' '}
                    {file.originalHeight})
                  </p>
                </div>
                <div className="field is-grouped">
                  <p className="control">
                    <input
                      className="input"
                      placeholder="width"
                      name="width"
                      type="number"
                      min="0"
                      onChange={handleFilePropertyChange(i)}
                      defaultValue={file.width}
                    />
                  </p>
                  <p className="is-size-3 mr-3">×</p>
                  <p className="control">
                    <input
                      className="input"
                      placeholder="height"
                      name="height"
                      type="number"
                      min="0"
                      onChange={handleFilePropertyChange(i)}
                      defaultValue={file.height}
                    />
                  </p>
                  <p className="control">
                    <input
                      className="input"
                      placeholder="glyph"
                      name="glyph"
                      type="text"
                      onChange={handleFilePropertyChange(i)}
                      defaultValue={file.glyph}
                    />
                  </p>
                  <p className="control">
                    <button
                      className="button is-danger"
                      onClick={handleFileRemove(i)}
                    >
                      Remove
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ))}

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
                      <option value="original-size">Original size</option>
                      <option value="scale">
                        Scale to fit, keeping proportions
                      </option>
                      <option value="stretch-fill">
                        Stretch to fill canvas
                      </option>
                      <option value="stretch-horizontally">
                        Stretch to fill canvas horizontally
                      </option>
                      <option value="stretch-vertically">
                        Stretch to fill canvas vertically
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
                  <label className="checkbox mr-2">
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
                  <label className="checkbox mr-2">
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

        <div>
          <p className="is-size-3">3. Preview</p>
          {files.map((file, i) => (
            <canvas
              className="mr-3"
              key={`Canvas-${file.name}-${i}`}
              ref={(ref) => setFileRef(i, ref)}
              width={file.width}
              height={file.height}
            />
          ))}
        </div>

        <hr />

        <p className="is-size-3">4. Output</p>

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
                      <option value="plain">Plain bytes</option>
                      <option value="arduino">Arduino code</option>
                      <option value="arduino-single">
                        Arduino code, single bitmap
                      </option>
                      <option value="adafruit-gfx">
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

          {options.format === 'adafruit-gfx' && (
            <>
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
                  <label className="label">X Advance</label>
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
            </>
          )}

          {options.format !== 'plain' && (
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
          )}

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
            <button
              className={classnames(
                'button',
                files.length === 0 ? 'is-danger' : 'is-primary'
              )}
              disabled={files.length === 0}
              onClick={handleGenerateOutput}
            >
              Generate
            </button>

            {files.length === 0 && (
              <p className="help is-danger">Please select one or more files</p>
            )}
          </div>
          <div className="field">
            <div className="control">
              <textarea
                className="textarea is-family-monospace"
                placeholder="Code goes here"
                rows="10"
                readOnly
                spellCheck={false}
                defaultValue={output}
              />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default Image2Cpp
