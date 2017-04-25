import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

class Navbar extends React.Component {
  static handleClose() {
    window.close();
  }

  render() {
    return (
      <nav className={styles.navbar}>
        <div className={styles.title}>
          <div>{this.props.title}</div>
          <div className={styles.status}>{this.props.status}</div>
        </div>
        <button className={styles.close} onClick={Navbar.handleClose} />
      </nav>
    );
  }
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string,
};

Navbar.defaultProps = {
  status: '',
};

export default Navbar;
