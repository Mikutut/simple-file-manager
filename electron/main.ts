import path from "path";
import { app, BrowserWindow, ipcMain, shell } from "electron";
import isDev from "electron-is-dev";

const IS_DEV_SERVER = process.env.IS_DEV_SERVER ?? null;

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, `preload.js`),
			contextIsolation: false
		},
	});

	mainWindow.loadURL(IS_DEV_SERVER
		? `http://localhost:3000` 
		: `file:///${path.join(__dirname, `./index.html`)}`
	);
}

// Hot Reload (doesn't work tho, prob Webpack's fault)
try {
	if(isDev)
		require("electron-reload")(module);
} catch (_) { }

app.whenReady().then(() => {
	createWindow();
	app.on("activate", () => {
		if(BrowserWindow.getAllWindows().length === 0)
			createWindow();
	});	
});

app.on("open-url", (event, url: string) => {
	event.preventDefault();
	shell.openExternal(url);
})
app.on("window-all-closed", () => {
	if(process.platform !== 'darwin')
		app.quit();
});

ipcMain.on("platform-versions-request", (ev) => {
	const versions = {
		chrome: process.versions["chrome"] as string,
		node: process.versions["node"] as string,
		electron: process.versions["electron"] as string
	};

	ev.returnValue = versions;
});
ipcMain.on("is-dev-request", (ev) => {
	ev.returnValue = isDev;
});