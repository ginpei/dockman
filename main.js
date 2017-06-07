const path = require('path');
const url = require('url');
const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
	win = new BrowserWindow({
		height: 600,
		width: 800,
	});

	win.loadURL(url.format({
		pathname: path.join(__dirname, 'front/index.html'),
		protocol: 'file:',
		slashes: true,
	}));

	win.webContents.openDevTools();

	win.on('closed', ()=>{
		win = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', ()=>{
	if (!win) {
		createWindow();
	}
});
