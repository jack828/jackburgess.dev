import classnames from 'classnames'

const Container = ({ fluid, padded, children }) => {
  return (
    <div
      className={classnames('container', {
        'is-fluid': fluid,
        'p-5': padded
      })}
    >
      {children}
    </div>
  )
}

export default Container
