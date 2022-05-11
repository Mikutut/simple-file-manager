//#region Settings
	interface ISettingsProps {
		initMode: any;
		systemBorders: any;
	}
	interface ISettingsBase {
		label: string;
		value: any;
	}
	interface ISettingsString extends ISettingsBase {
		value: string;
	}
	interface ISettingsSwitchable extends ISettingsBase {
		value: boolean;
	}
	interface ISettingsRadioOption extends ISettingsBase {
		value: boolean;
	}
	interface ISettingsRadio {
		label: string;
		options: ISettingsRadioOption[];
	}

	//#region InitMode
		type InitMode = "last-opened" | "homepage" | "custom";	
		interface ISettingsInitMode extends ISettingsString {
			value: InitMode;
		}
	//#endregion

	interface ISettingsScheme extends ISettingsProps {
		initMode: ISettingsInitMode;
		systemBorders: ISettingsSwitchable;
	}

	const DEFAULT_SETTINGS: ISettingsScheme = {
		initMode: { label: "Open on startup on", value: "homepage" },
		systemBorders: { label: "Enable system borders (requires restart)", value: false },
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
	ISettingsInitMode,
	ISettingsProps,
	IPlatformVersions,
	IElectronAPI
};