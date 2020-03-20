const { ipcRenderer } = require('electron');
const { $ } = require('./chooser');
$('choose-music').addEventListener('click', () => {
	ipcRenderer.send('openMusicFile');
});
