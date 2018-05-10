import PropTypes from 'prop-types'

export const Footer = props => (
  <footer>
    © {props.year} {props.whoGotAllTheRights}
  </footer>
)
Footer.defaultProps = {
  year: new Date().getFullYear(),
}
Footer.propTypes = {
  year: PropTypes.number.isRequired,
  whoGotAllTheRights: PropTypes.string.isRequired,
}
