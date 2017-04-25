import React from 'react';
import { autobind } from 'core-decorators';
import { map, reduce } from 'underscore';
import { ipcRenderer } from 'electron';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Block from '../Block/Block';
import MatchForm from '../MatchForm/MatchForm';
import MatchHistory from '../MatchHistory/MatchHistory';
import styles from './styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessions: [],
      saved: true,
      loaded: false,
      statusMsg: '',
      sessionId: 0,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ipcRenderer.send('loadJson');

    ipcRenderer.on('jsonSaved', (event, data) => {
      if (data) {
        this.setState(Object.assign({}, this.state, { saved: true, statusMsg: 'Saved' }));
      } else {
        this.setState(Object.assign({}, this.state, { statusMsg: 'Saving failed' }));
      }
    });

    ipcRenderer.on('jsonLoaded', (event, data) => {
      if (data) {
        this.setState(Object.assign({}, this.state, { sessions: data.sessions, sessionId: data.sessions.length - 1, loaded: true, statusMsg: 'Loaded' }));
      } else {
        this.setState(Object.assign({}, this.state, { statusMsg: 'Loading failed' }));
      }
    });
  }

  onChange(state) {
    this.setState(state);
  }

  @autobind
  handleAddMatch(data) {
    const newSessions = this.state.sessions;
    newSessions[
      this.state.sessions.length - 1 - this.state.sessionId
    ].matches.unshift(data);
    ipcRenderer.send('saveJson', { sessions: newSessions });
    this.setState(Object.assign({},
      this.state,
      { sessions: newSessions, saved: false, statusMsg: 'saving' }));
  }

  @autobind
  handleDeleteMatch(index) {
    const newSessions = this.state.sessions;
    newSessions[
      this.state.sessions.length - 1 - this.state.sessionId
    ].matches.splice(index, 1);
    ipcRenderer.send('saveJson', { sessions: newSessions });
    this.setState(Object.assign({},
      this.state,
      { sessions: newSessions, saved: false, statusMsg: 'saving' }));
  }

  @autobind
  handleStartNewSession() {
    const newSessions = this.state.sessions;
    newSessions.unshift({ id: this.state.sessions.length, matches: [] });
    ipcRenderer.send('saveJson', { sessions: newSessions });
    this.setState(Object.assign({},
      this.state, { sessions: newSessions, saved: false, statusMsg: 'saving', sessionId: newSessions.length - 1 }));
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Navbar title="Overwatch SR Tracker" status={this.state.statusMsg} />
        <Header
          srChange={(this.state.sessions.length > 0 &&
            reduce(
              map(this.state.sessions[
                this.state.sessions.length - 1 - this.state.sessionId
              ].matches,
                match => match.sr),
              (memo, num) => memo + num)
            ) || 0}
          startNewSession={this.handleStartNewSession}
        />
        <MatchForm
          onWin={this.handleAddMatch}
          onLoss={this.handleAddMatch}
        />
        <div className={styles.main}>
          <div className={styles.row}>
            <div className={styles.column} style={{ width: '100%' }}>
              <Block
                title="Match history"
                width="100%"
              >
                {this.state.sessions.length > 0 &&
                  <MatchHistory
                    matches={
                      this.state.sessions[
                        this.state.sessions.length - 1 - this.state.sessionId
                      ].matches
                    }
                    onDelete={this.handleDeleteMatch}
                  />
                }
              </Block>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
