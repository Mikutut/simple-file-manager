import { contextBridge, ipcRenderer } from "electron";
import { ISettingsScheme, IElectronAPI } from "@c/common";

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
	errorAPI: {
		reportError: (errorType, errorMessage) => ipcRenderer.send("request", "error-thrown", errorType, errorMessage)
	},
	nodeAPI: {
		bufferEncode: (data: string, inEncoding: BufferEncoding, outEncoding: BufferEncoding) => Buffer.from(data, inEncoding).toString(outEncoding)
	},
	settingsAPI: {
		loadSettings: () => ipcRenderer.invoke("request-async", "load-settings"),
		readSettings: () => ipcRenderer.invoke("request-async", "read-settings"),
		modifySettings: (settings: ISettingsScheme) => ipcRenderer.invoke("request-async", "modify-settings", JSON.stringify(settings)),
		writeSettings: () => ipcRenderer.invoke("request-async", "write-settings"),
		forceLoadDefaults: () => ipcRenderer.invoke("request-async", "force-load-default-settings")
	},
	ipcAPI: {
		registerIPCCallback: (channel, callback) => { 
			ipcRenderer.on("response", (event, _channel, ...args: any[]) => {
				if(_channel === channel) {
					callback(...args);
				}
			})
		},
		invoke: (channel, args) => ipcRenderer.invoke("request-async", ...args)
	}
}

contextBridge.exposeInMainWorld("electronAPI", electronAPI);