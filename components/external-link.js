const ExternalLink = ({ href, children, ...other }) => (
  <a href={href} target="_blank" rel="noopener noreferrer nofollow" {...other}>
    {children}
  </a>
)

export default ExternalLink
