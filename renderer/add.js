const { ipcRenderer } = require('electron');
const { $ } = require('./chooser');
const path = require('path');
$('choose-music').addEventListener('click', () => {
	ipcRenderer.send('openMusicFile');
});

const musicFileRender = (pathes) => {
	const musicList = $('musicList');
	const musicItemsHTML = pathes.reduce((html, music) => {
		return (html += `<li class = "list-group-item">${path.basename(music)}</li>`);
	}, '');
	console.log(musicItemsHTML);
	musicList.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`;
};

let musicFilesPath = [];
ipcRenderer.on('has-choosed-file', (event, filepaths) => {
	musicFilesPath = musicFilesPath.concat(filepaths);
	console.log(musicFilesPath);
	musicFileRender(musicFilesPath);
});
