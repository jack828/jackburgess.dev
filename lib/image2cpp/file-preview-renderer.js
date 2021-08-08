const renderFilePreview = (file, options) => {
  const { canvas, image, originalWidth, originalHeight } = file
  const ctx = canvas.getContext('2d')
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
        offsetX = Math.round((canvas.width - originalWidth * useRatio) / 2)
      }
      if (options.centerVertically) {
        offsetY = Math.round((canvas.height - originalHeight * useRatio) / 2)
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
      avg = avg > Number(options.threshold) ? 255 : 0
      data[i] = avg // red
      data[i + 1] = avg // green
      data[i + 2] = avg // blue
    }
    ctx.putImageData(imageData, 0, 0)

    if (options.invertColours) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
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
}

export default renderFilePreview
