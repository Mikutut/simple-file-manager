import { contextBridge, ipcRenderer } from "electron";
import { ISettings } from "./common";

interface IElectronAPI {
	devAPI: {
		getIsDev: () => void,
		getPlatformVersions: () => void,
		simulateError: (errorMessage: string) => void,
		navigate: (path: string) => void,
		reloadSettings: () => void
	},
	windowManipulationAPI: {
		minimizeWindow: () => void,
		toggleWindowMaximization: () => void,
		closeWindow: () => void
	},
	nodeAPI: {
		bufferEncode: (data: string, inEncoding: BufferEncoding, outEncoding: BufferEncoding) => string
	},
	settingsAPI: {
		loadSettings: () => void,
		readSettings: () => void,
		modifySettings: (settings: ISettings) => void,
		writeSettings: () => void
	},
	ipcAPI: {
		registerIPCCallback: (channel: string, callback: (...args: any[]) => void) => void
	}
}

const electronAPI: IElectronAPI = {
	devAPI: {
		getIsDev: () => ipcRenderer.send("request", "is-dev"),
		getPlatformVersions: () => ipcRenderer.send("request", "platform-versions"),
		simulateError: (errorMessage: string) => ipcRenderer.send("request", "dev-error-simulation", errorMessage),
		navigate: (path: string) => ipcRenderer.send("request", "dev-navigate", path),
		reloadSettings: () => ipcRenderer.send("request", "load-settings")
	},
	windowManipulationAPI: {
		minimizeWindow: () => ipcRenderer.send("request", "minimize-window"),
		toggleWindowMaximization: () => ipcRenderer.send("request", "toggle-window-maximization"),
		closeWindow: () => ipcRenderer.send("request", "close-window")
	},
	nodeAPI: {
		bufferEncode: (data: string, inEncoding: BufferEncoding, outEncoding: BufferEncoding) => Buffer.from(data, inEncoding).toString(outEncoding)
	},
	settingsAPI: {
		loadSettings: () => ipcRenderer.send("request", "load-settings"),
		readSettings: () => ipcRenderer.send("request", "read-settings"),
		modifySettings: (settings: ISettings) => ipcRenderer.send("request", "modify-settings", JSON.stringify(settings)),
		writeSettings: () => ipcRenderer.send("request", "write-settings")
	},
	ipcAPI: {
		registerIPCCallback: (channel, callback) => { 
			ipcRenderer.on("response", (event, _channel, ...args: any[]) => {
				if(_channel === channel) {
					callback(...args);
				}
			})
		},
	}
}

contextBridge.exposeInMainWorld("electronAPI", electronAPI);

export {
	IElectronAPI
}