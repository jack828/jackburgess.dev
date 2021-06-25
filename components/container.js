import classnames from 'classnames'

const Container = ({ fluid, noPadding, children }) => {
  return (
    <div
      className={classnames('container', {
        'is-fluid': fluid,
        'p-5': !noPadding
      })}
    >
      {children}
    </div>
  )
}

export default Container
