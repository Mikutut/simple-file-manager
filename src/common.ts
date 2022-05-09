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

export {
	InitMode,
	ISettingsScheme,
	ISettingsInitMode,
	ISettingsProps,
	DEFAULT_SETTINGS,
	IPlatformVersions
};