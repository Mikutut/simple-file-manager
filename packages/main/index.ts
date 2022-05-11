import { app, BrowserWindow, shell, ipcMain, session, dialog } from 'electron';
import { loadSettings, settings, loadSettingsEvent, readSettingsEvent, modifySettingsEvent, writeSettingsEvent, forceLoadDefaultSettingsEvent } from './settings';
import * as path from "path";
import os from "os";
import isDev from "electron-is-dev";
import dotenv from "dotenv";

dotenv.config();

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
		webPreferences: {
			preload: path.join(__dirname, "../preload/index.cjs")
		},
		frame: settings.systemBorders.value ?? false
  });

  // and load the index.html of the app.
  if(app.isPackaged) {
		mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"))
	} else {
		mainWindow.loadURL(`http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`);
	}

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

	mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
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
				default:
					event.sender.send("response", "error-thrown", "ipc", "Unknown channel");
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
				default:
					event.sender.send("response", "error-thrown", "ipc", "Unknown channel");
			}
		}
	});
	ipcMain.handle("request-async", (event, channel, ...args) => { 
		switch(channel) {
			case "load-settings":
				return loadSettingsEvent();
			break;
			case "read-settings":
				return readSettingsEvent();
			break;
			case "modify-settings":
				return modifySettingsEvent(args[0]);
			break;
			case "write-settings":
				return writeSettingsEvent();
			break;
			case "force-load-default-settings":
				return forceLoadDefaultSettingsEvent();
			break;
			default:
				return Promise.reject([ "ipc", "Unknown channel" ]);
		}
	});
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
				createWindow()
			else
				BrowserWindow.getAllWindows()[0].focus();
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
	})
	.catch((err) => {
		dialog.showErrorBox("Initialization error", `Simple file manager crashed during initialization.\nReason: ${err.message ?? err.toString() ?? "unknown"}\n\nPlease reinstall the app. If it not helps, contact the developer (https://mikut.dev)`);
		app.quit();
	});