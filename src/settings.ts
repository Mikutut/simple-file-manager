import { app, ipcMain, IpcMainInvokeEvent } from "electron";
import path from "path";
import * as fs from "fs/promises";
import { ISettingsScheme, DEFAULT_SETTINGS, InitMode, ISettingsProps } from "./common";

const SETTINGS_PATH = path.join(app.getPath("userData"), "settings.json");
interface ISettingsWritable extends ISettingsProps {
	initMode: InitMode;
	systemBorders: boolean;
}

let settings: ISettingsScheme;

const loadSettings = () => new Promise<void>((res, rej) => {
	fs.readFile(SETTINGS_PATH, { encoding: "utf-8" })
		.then((data: string) => {
			try {
				const settingsWritable: ISettingsWritable = JSON.parse(data);
				settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS)) as ISettingsScheme;

				settings.initMode.value = settingsWritable.initMode;
				settings.systemBorders.value = settingsWritable.systemBorders;

				res();
			}
			catch(err) {
				rej(err);
			}
		})
		.catch((err: NodeJS.ErrnoException) => {
			if(err.code !== "ENOENT") {
				rej(err);
			} else {
				settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
				return writeSettings();
			}
		});
});
const writeSettings = () => new Promise<void>((res, rej) => {
	const settingsWritable: ISettingsWritable = {
		initMode: settings.initMode.value,
		systemBorders: settings.systemBorders.value,
	};

 return fs.writeFile(SETTINGS_PATH, JSON.stringify(settingsWritable), "utf-8")
		.then(() => res())
		.catch((err) => rej(err));
});
const readSettings = () => new Promise<string>((res, rej) => {
	try {
		const settingsStr = JSON.stringify(settings);
		res(settingsStr);
	} catch(err) {
		rej(err);
	}
});
const modifySettings = (newSettings: string) => new Promise<void>((res, rej) => {
	try {
		const modifiedSettings = JSON.parse(newSettings);
		settings = modifiedSettings;
		res();
	} catch(err) {
		rej(err)
	}
});
const forceLoadDefaultSettings = () => new Promise<string>((res, rej) => {
	return modifySettings(JSON.stringify(DEFAULT_SETTINGS))
		.then(() => readSettings())
		.catch((err) => rej(err));
});

const loadSettingsEvent = () => new Promise<void>((res, rej) => {
	return loadSettings()
		.then(() => res())
		.catch((err) => rej(["settings", `Couldn't load settings. Reason: ${err.message ?? err.toString() ?? "unknown"}`]));
});
const readSettingsEvent = () => new Promise<string>((res, rej) => {
		return readSettings()
			.then((settingsStr: string) => res(settingsStr))
			.catch((err) => rej(["settings", `Couldn't read settings. Reason: ${err.message ?? "unknown"}`]));
});
const modifySettingsEvent = (newSettings: string) => new Promise<void>((res, rej) => {
	return modifySettings(newSettings)
		.then(() => res())
		.catch((err) => rej(["settings", `Couldn't modify settings. Reason: ${err.message ?? "unknown"}`]));
});
const writeSettingsEvent = () => new Promise<void>((res, rej) => {
	return writeSettings()
		.then(() => res())
		.catch((err) => rej(["settings/io", `Couldn't write settings to file. Reason: ${err.message ?? "unknown"}`]));
});
const forceLoadDefaultSettingsEvent = () => new Promise<string>((res, rej) => {
	return modifySettingsEvent(JSON.stringify(DEFAULT_SETTINGS))
		.then(() => readSettingsEvent())
		.catch((errData: string[]) => rej(errData));
})

const settingsIPCHandler = () => {
	ipcMain.handle("request-async", (event: IpcMainInvokeEvent, channel: string, ...args: any[]) => {
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
		}
	});
}

export {
	settings,
	settingsIPCHandler,
	loadSettings,
	readSettings,
	modifySettings,
	writeSettings,
	forceLoadDefaultSettings
};