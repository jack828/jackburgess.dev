const Image = ({ src, srcWebp, alt, ...rest }) => (
  <picture>
    <source srcSet={srcWebp} type="image/webp" alt={alt} {...rest} />
    <source srcSet={src} type="image/jpeg" alt={alt} {...rest} />
    <img src={src} alt={alt} {...rest} />
  </picture>
)

export default Image
