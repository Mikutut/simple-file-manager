//#region Settings
	//#region InitMode
		type InitMode = "last-opened" | "homepage" | string;	
	//#endregion

	interface ISettingsScheme {
		initMode: InitMode;
		systemBorders: boolean;
		lastOpened: string;
	}

	const DEFAULT_SETTINGS: ISettingsScheme = {
		initMode: "homepage",
		systemBorders: false,
		lastOpened: ""
	} 
//#endregion

//#region Dev
	interface IPlatformVersions {
		chrome: string;
		node: string;
		electron: string;
	}
//#endregion

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
	errorAPI: {
		reportError: (errorType: string, errorMessage: string) => void
	}
	nodeAPI: {
		bufferEncode: (data: string, inEncoding: BufferEncoding, outEncoding: BufferEncoding) => string
	},
	settingsAPI: {
		loadSettings: () => Promise<any>,
		readSettings: () => Promise<string>,
		modifySettings: (settings: ISettingsScheme) => Promise<any>,
		writeSettings: () => Promise<any>,
		forceLoadDefaults: () => Promise<string>
	},
	ipcAPI: {
		registerIPCCallback: (channel: string, callback: (...args: any[]) => void) => void,
		invoke: (channel: string, ...args: any[]) => Promise<any>
	}
}

export {
	DEFAULT_SETTINGS,
};
export type {
	InitMode,
	ISettingsScheme,
	IPlatformVersions,
	IElectronAPI
};