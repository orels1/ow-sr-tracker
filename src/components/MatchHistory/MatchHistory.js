import React from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import styles from './styles.css';

const MatchHistory = props => (
  <div className={styles.matches}>
    {props.matches.map((match, index) => (
      <div key={match.timestamp} className={(match.gain && styles.matchWon) || styles.matchLost}>
        <div className={styles.sr}>{match.sr}</div>
        <div className={styles.hero}>{match.hero}</div>
        <div className={styles.right}>
          <div className={`${styles.map} ${styles[match.map]}`}>
            <div className={styles.mapName}>{match.map}</div>
          </div>
          <DeleteButton className={styles.delete} index={index} onDelete={props.onDelete} />
        </div>
      </div>
    ))}
  </div>
);

MatchHistory.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.shape({
    gain: PropTypes.bool.isRequired,
    sr: PropTypes.number.isRequired,
    map: PropTypes.string.isRequired,
    hero: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  })).isRequired,
  onDelete: PropTypes.func.isRequired,
};

class DeleteButton extends React.Component {
  @autobind
  handleClick() {
    this.props.onDelete(this.props.index);
  }

  render() {
    return (
      <button className={this.props.className} onClick={this.handleClick} />
    );
  }
}

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
};

export default MatchHistory;
