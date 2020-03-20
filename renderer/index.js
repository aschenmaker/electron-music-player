const { ipcRenderer } = require('electron');
const { $ } = require('./chooser');

$('add_music').addEventListener('click', () => {
	ipcRenderer.send('addMusic');
});
