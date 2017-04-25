import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const StatsList = props => (
  <div className={styles.statsList}>
    {props.stats.map(item => (
      <div className={styles.item} key={item.id}>
        <div className={styles.itemName}>
          {item.name}
        </div>
        <div className={styles.itemValue}>
          {item.value}
        </div>
      </div>
    ))}
  </div>
);

StatsList.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StatsList;
