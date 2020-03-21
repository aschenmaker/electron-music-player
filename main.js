const { app, BrowserWindow, ipcMain, dialog } = require('electron');

// 封装一个窗口类

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
	// 监听ipc
	ipcMain.on('addMusic', () => {
		const addMusicWindow = new AppWindow(
			{
				width: 500,
				height: 400,
				parent: mainWindow
			},
			'./renderer/add.html'
		);
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
	});
});
