import classnames from 'classnames'

const Container = ({ fluid, children }) => {
  return (
    <div className={classnames('container p-5', { 'is-fluid': fluid })}>
      {children}
    </div>
  )
}

export default Container
