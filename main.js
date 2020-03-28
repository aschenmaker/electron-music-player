const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const DataStore = require('./renderer/MusicDataStore');
// 封装一个窗口类
const myStore = new DataStore({
	name: 'Music Data'
});
class AppWindow extends BrowserWindow {
	constructor(config, flieLocation) {
		const basicConfig = {
			width: 800,
			height: 600,
			webPreferences: {
				nodeIntegration: true
			}
		};
		// const finalConfig = Object.assign(basicConfig,config);
		const finalConfig = { ...basicConfig, ...config };
		super(finalConfig);
		this.loadFile(flieLocation);
		this.once('ready-to-show', () => {
			this.show();
		});
	}
}

app.on('ready', () => {
	console.log('ready');
	const mainWindow = new AppWindow({}, './renderer/index.html');
	console.log('page did finish load');
	mainWindow.webContents.on('did-finish-load', () => {
		mainWindow.send('getTracks', myStore.getTracks());
	});
	// 监听ipc
	ipcMain.on('deleteTracks', (event, id) => {
		const updateTracks = myStore.deleteTracks(id).getTracks();
		mainWindow.send('getTracks', updateTracks);
	});
	ipcMain.on('addTracks', (event, tracks) => {
		console.log(tracks);
		const updateTracks = myStore.addTracks(tracks).getTracks();
		mainWindow.send('getTracks', updateTracks);
	});
	ipcMain.on('openMusicFile', (event) => {
		dialog
			.showOpenDialog({
				properties: [ 'openFile', 'multiSelections' ],
				filters: [ { name: 'Music', extensions: [ 'mp3' ] } ]
			})
			.then((res) => {
				if (!res.canceled) {
					console.log(res.filePaths);
					event.sender.send('has-choosed-file', res.filePaths);
				}
			});
	});
	ipcMain.on('addMusic', () => {
		const addMusicWindow = new AppWindow(
			{
				width: 500,
				height: 400,
				parent: mainWindow
			},
			'./renderer/add.html'
		);
	});
});
