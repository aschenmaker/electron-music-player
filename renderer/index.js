const { ipcRenderer } = require('electron');

document.getElementById('add_music').addEventListener('click', () => {
	ipcRenderer.send('addMusic');
});
