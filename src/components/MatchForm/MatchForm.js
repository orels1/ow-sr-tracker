import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { autobind } from 'core-decorators';
import moment from 'moment';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import styles from './styles.css';

class MatchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: { value: 'ilios', label: 'Ilios' },
      hero: { value: 'soldier', label: 'Soldier 76' },
      gain: true,
      sr: 0,
      maps: [
        { value: 'hanamura', label: 'Hanamura' },
        { value: 'anubis', label: 'Temple of Anubis' },
        { value: 'volskaya', label: 'Volskaya Industries' },
        { value: 'dorado', label: 'Dorado' },
        { value: 'route66', label: 'Route 66' },
        { value: 'gibraltar', label: 'Wachpoint Gibraltar' },
        { value: 'hollywood', label: 'Hollywood' },
        { value: 'kings_row', label: 'King\'s Row' },
        { value: 'numbani', label: 'Numbani' },
        { value: 'eichenwalde', label: 'Eichenwalde' },
        { value: 'ilios', label: 'Ilios' },
        { value: 'lijang', label: 'Lijang Tower' },
        { value: 'nepal', label: 'Nepal' },
        { value: 'oasis', label: 'Oasis' },
      ],
      heroes: [
        { value: 'genji', label: 'Genji' },
        { value: 'mccree', label: 'McCree' },
        { value: 'pharah', label: 'Pharah' },
        { value: 'reaper', label: 'Reaper' },
        { value: 'soldier', label: 'Soldier 76' },
        { value: 'sombra', label: 'Sombra' },
        { value: 'tracer', label: 'Tracer' },
        { value: 'bastion', label: 'Bastion' },
        { value: 'hanzo', label: 'Hanzo' },
        { value: 'junkrat', label: 'Junkrat' },
        { value: 'mei', label: 'Mei' },
        { value: 'torb', label: 'Torbjorn' },
        { value: 'widowmaker', label: 'Widowmaker' },
        { value: 'diva', label: 'D.Va' },
        { value: 'orisa', label: 'Orisa' },
        { value: 'rein', label: 'Reinhardt' },
        { value: 'roadhog', label: 'Roadhog' },
        { value: 'winston', label: 'Winston' },
        { value: 'zarya', label: 'Zarya' },
        { value: 'ana', label: 'Ana' },
        { value: 'lucio', label: 'Lucio' },
        { value: 'mercy', label: 'Mercy' },
        { value: 'symmetra', label: 'Symmetra' },
        { value: 'zenyatta', label: 'Zenyatta' },
      ],
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(state) {
    this.setState(state);
  }

  @autobind
  handleMapChange(val) {
    this.setState(Object.assign({}, this.state, { map: val }));
  }

  @autobind
  handleHeroChange(val) {
    this.setState(Object.assign({}, this.state, { hero: val }));
  }

  @autobind
  handleSrChange(event) {
    event.preventDefault();
    this.setState(Object.assign({}, this.state, { sr: parseInt(event.target.value, 10) }));
  }

  @autobind
  handleWin() {
    if (this.state.sr !== 0) {
      this.props.onWin({
        map: this.state.map.value,
        hero: this.state.hero.value,
        gain: true,
        sr: this.state.sr,
        timestamp: moment().format('x'),
      });
    }
  }

  @autobind
  handleLoss() {
    if (this.state.sr !== 0) {
      this.props.onLoss({
        map: this.state.map.value,
        hero: this.state.hero.value,
        gain: false,
        sr: -this.state.sr,
        timestamp: moment().format('x'),
      });
    }
  }

  render() {
    return (
      <div className={styles.form}>
        <div className={styles.row}>
          <Select
            className={styles.inputSelect}
            value={this.state.map}
            options={this.state.maps}
            onChange={this.handleMapChange}
            clearable={false}
          />
          <Select
            className={styles.inputSelect}
            value={this.state.hero}
            options={this.state.heroes}
            onChange={this.handleHeroChange}
            clearable={false}
          />
          <input
            type="number"
            placeholder="SR"
            className={styles.input}
            value={this.state.sr}
            onChange={this.handleSrChange}
          />
        </div>
        <div className={styles.row}>
          <Button title="Won" onClick={this.handleWin} shadow={false} color="#2ecc71" />
          <Button title="Lost" onClick={this.handleLoss} shadow={false} color="#e74c3c" />
        </div>
      </div>
    );
  }
}

MatchForm.propTypes = {
  onWin: PropTypes.func.isRequired,
  onLoss: PropTypes.func.isRequired,
};

export default MatchForm;
