import { contextBridge, ipcRenderer } from "electron";
import { IElectronAPI } from "./renderer";

const electronAPI: IElectronAPI = {
	devAPI: {
		isDev: () => ipcRenderer.invoke("request-is-dev"),
		platformVersions: () => ipcRenderer.invoke("request-platform-versions"),
		simulateError: (errorMessage: string) => ipcRenderer.send("request-error-simulation", errorMessage)
	},
	windowManipulationAPI: {
		minimizeWindow: () => ipcRenderer.send("request-minimize-window"),
		toggleWindowMaximization: () => ipcRenderer.send("request-toggle-window-maximization"),
		closeWindow: () => ipcRenderer.send("request-close-window")
	},
	errorHandlingAPI: {
		errorHandler: (errType: string, callback: (errorType: string, errorMessage: string) => void) => {
			if(errType === "io" || errType === "test") {
				ipcRenderer.on("error-thrown", (event, _errorType: string, _errorMessage: string) => {
					if(_errorType === errType)
						callback(_errorType, _errorMessage);
				});
				return true;
			} else {
				return false;
			}
		}
	},
	nodeAPI: {
		bufferEncode: (data: string, inEncoding: BufferEncoding, outEncoding: BufferEncoding) => Buffer.from(data, inEncoding).toString(outEncoding)
	}
}

contextBridge.exposeInMainWorld("electronAPI", electronAPI);