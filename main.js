const { app, BrowserWindow, ipcMain } = require('electron');

// 封装一个窗口类

app.on('ready', () => {
	console.log('ready');
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});
	mainWindow.loadFile('./renderer/index.html');

	ipcMain.on('addMusic', () => {
		console.log('hello');
		const addMusicWindow = new BrowserWindow({
			width: 400,
			height: 300,
			webPreferences: {
				nodeIntegration: true
			},
			parent: mainWindow
		});
		addMusicWindow.loadFile('./renderer/add.html');
	});
});
