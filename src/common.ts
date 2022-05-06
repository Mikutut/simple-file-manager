//#region Settings
	interface ISettingsBase {
		key: string;
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
		key: string;
		label: string;
		options: ISettingsRadioOption[];
	}
	interface ISettingsInitMode extends ISettingsString {
		value: InitMode;
	}
	type InitMode = "last-opened" | "homepage";	

	type ISettings = ISettingsString[] & ISettingsSwitchable[] & ISettingsRadio[] & ISettingsInitMode[];
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
	ISettings,
	IPlatformVersions
};