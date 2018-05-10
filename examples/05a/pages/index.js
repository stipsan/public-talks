import PropTypes from 'prop-types'
import { Component } from 'react'

export default class Modal extends Component {
  static defaultProps = {
    isOpen: false,
  }

  static propTypes = {
    isOpen: PropTypes.bool,
  }

  state = { isOpen: this.props.isOpen }

  render() {
    return (
      <div>
        {this.state.isOpen && <div>Modal content</div>}
        <button
          onClick={() =>
            this.setState(prevState => ({ isOpen: !prevState.isOpen }))
          }
        />
      </div>
    )
  }
}
