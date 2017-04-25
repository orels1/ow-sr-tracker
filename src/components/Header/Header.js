import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Header = props => (
  <div className={styles.header}>
    <div className={styles.contents}>
      <div>
        SR this session
      </div>
      <div
        className={
          `${(props.srChange < 0 && styles.srChangeNegative) || styles.srChange}`
        }
      >
        {props.srChange}
      </div>
    </div>
    <button className={styles.newSession} onClick={props.startNewSession}>Start new session</button>
  </div>
);

Header.propTypes = {
  srChange: PropTypes.number,
  startNewSession: PropTypes.func.isRequired,
};

Header.defaultProps = {
  srChange: 0,
};

export default Header;
