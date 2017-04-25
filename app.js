const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('mz/fs');
const sortBy = require('underscore').sortBy;

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 700,
    minWidth: 700,
    height: 750,
    minHeight: 750,
    center: true,
    frame: false,
    show: false,
    title: 'Overwatch SR Tracker',
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  win.once('ready-to-show', () => {
    win.show();
  });
  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', () => {
  createWindow();
  if (process.env.NODE_ENV === 'dev') {
    try {
      BrowserWindow.addDevToolsExtension(
        'C:\\Users\\orel-\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\2.0.12_0'
      );
    } catch (e) {
      console.log(e);
    }
  }
});

app.on('windows-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('saveJson', (event, data) => {
  const payload = data;
  payload.sessions = sortBy(payload.sessions, session => -session.id);
  payload.sessions.forEach((item, index) => {
    payload.sessions[index].matches = sortBy(payload.sessions[index].matches,
      match => -match.timestamp);
  });
  fs.writeFile('./sessions.json', JSON.stringify(payload, null, 2))
  .then(() => {
    event.sender.send('jsonSaved', true);
  })
  .catch(err => console.log(err));
});

ipcMain.on('loadJson', (event) => {
  fs.readFile('./sessions.json')
  .then((data) => {
    event.sender.send('jsonLoaded', JSON.parse(data));
  })
  .catch((err) => {
    if (err.name === 'SyntaxError') {
      event.sender.send('jsonLoaded', { sessions: [{ id: 0, matches: [] }] });
    }
  });
});
