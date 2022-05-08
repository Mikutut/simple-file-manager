import { app, BrowserWindow, shell, ipcMain, session, dialog } from 'electron';
import { loadSettings, settingsIPCHandler, settings } from './settings';
import * as path from "path";
import os from "os";
import isDev from "electron-is-dev";
import dotenv from "dotenv";

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

dotenv.config();

const REACT_DEVTOOLS_EXTENSION_PATH: string = process.env.REACT_DEVTOOLS_EXTENSION_PATH as string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
		},
		frame: settings.systemBorders.value ?? false
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

	mainWindow.webContents.setWindowOpenHandler(({ url }) => {
		shell.openExternal(url);
		return { action: "deny" };
	});

	ipcMain.on("request", (event, channel, ...args) => {
		console.log(args.toString());

		if(!isDev || (isDev && !channel.startsWith("dev"))) {
			switch(channel) {
				case "platform-versions": {
					const versions = {
						chrome: process.versions["chrome"] as string,
						node: process.versions["node"] as string,
						electron: process.versions["electron"] as string
					};

					event.sender.send("response", "platform-versions", JSON.stringify(versions));
				}
				break;
				case "is-dev":
					event.sender.send("response", "is-dev", isDev);
				break;
				case "minimize-window":
					mainWindow.minimize();
				break;
				case "toggle-window-maximization":
					if(mainWindow.isMaximized())
						mainWindow.unmaximize()
					else
						mainWindow.maximize();
				break;
				case "close-window":
					mainWindow.close();
				break;
				case "error-thrown":
					event.sender.send("response", "error-thrown", args[0], args[1]);
				break;
			}
		} else {
			switch(channel) {
				case "dev-navigate":
					event.sender.send("response", "dev-navigate", args[0]);
				break;
				case "dev-error-simulation": {
					console.log(`Simulating error...`);
					//event.sender.openDevTools();
					event.sender.send("response", "error-thrown", "test", args[0]);
				}
				break;
			}
		}
	});
	settingsIPCHandler();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on('ready', createWindow);
app.whenReady()
	.then(() => loadSettings()
		.catch(() => {
			dialog.showErrorBox("Initialization error", `Simple file manager couldn't load its settings.\nPlease reinstall the app.`);
			app.quit();
		})
	)
	.then(() => {
		createWindow();

		app.on("activate", () => {
			if(BrowserWindow.getAllWindows().length === 0)
				createWindow();
		});	
		app.on("open-url", (event, url: string) => {
			event.preventDefault();
			shell.openExternal(url);
		});
		app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') {
				app.quit();
			}
		});

		try {
			console.log(REACT_DEVTOOLS_EXTENSION_PATH);
			const reactDevToolsPath = path.join(os.homedir(), REACT_DEVTOOLS_EXTENSION_PATH);
			console.log(reactDevToolsPath);

			session.defaultSession.loadExtension(reactDevToolsPath);
		} catch(err) { console.error(err) }
	})
	.catch((err) => {
		dialog.showErrorBox("Initialization error", `Simple file manager crashed during initialization.\nReason: ${err.message ?? err.toString() ?? "unknown"}\n\nPlease reinstall the app. If it not helps, contact the developer (https://mikut.dev)`);
		app.quit();
	});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.