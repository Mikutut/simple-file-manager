//#region Error handling
	type ErrorType = "io" | "test";
	interface IError {
		type: ErrorType;
		message: string;
	}
//#endregion

//#region Settings
	type InitMode = "last-opened" | "homepage";	

	interface ISettings {
		lastOpened?: string;
		initMode: InitMode;
		minimizeToTray: boolean;
		closeToTray: boolean;
	};
//#endregion

export {
	IError,
	ErrorType,
	InitMode,
	ISettings
};