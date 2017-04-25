import React from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import styles from './styles.css';

class Button extends React.Component {
  @autobind
  handleButtonClick() {
    this.props.onClick();
  }

  render() {
    return (
      <button
        className={styles.button}
        style={{ background: this.props.color, boxShadow: !this.props.shadow && 'none' }}
        onClick={this.handleButtonClick}
      >
        {this.props.title}
      </button>
    );
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  shadow: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  color: '#ffc70e',
  shadow: true,
};

export default Button;
