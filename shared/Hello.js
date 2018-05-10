import PropTypes from 'prop-types'

export const Hello = props => <p>Hello {props.entity}!</p>
Hello.defaultProps = {
  entity: 'World',
}
Hello.propTypes = {
  entity: PropTypes.string.isRequired,
}
