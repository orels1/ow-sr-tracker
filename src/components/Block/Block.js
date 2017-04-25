import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Block = props => (
  <div className={styles.block} style={{ width: props.width }}>
    <div className={styles.header}>
      {props.title}
    </div>
    <div className={styles.contents}>
      {props.children}
    </div>
  </div>
);

Block.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
};

Block.defaultProps = {
  width: 'auto',
};

export default Block;
