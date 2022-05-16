import { app, ipcMain, IpcMainInvokeEvent } from "electron";
import path from "path";
import * as fs from "fs/promises";
import { ISettingsScheme, DEFAULT_SETTINGS, InitMode } from "@c/common";

const SETTINGS_PATH = path.join(app.getPath("userData"), "settings.json");

let settings: ISettingsScheme;

const loadSettings = () => new Promise<void>((res, rej) => {
	fs.readFile(SETTINGS_PATH, { encoding: "utf-8" })
		.then((data: string) => {
			try {
				settings = JSON.parse(data) as ISettingsScheme;
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
 return fs.writeFile(SETTINGS_PATH, JSON.stringify(settings), "utf-8")
		.then(() => res())
		.catch((err) => rej(err));
});
const readSettings = () => new Promise<string>((res, rej) => {
	try {
		const settingsStr = JSON.stringify(settings);
		console.log("Settings: ", settingsStr);
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
			.catch((err) => { 
				console.log("Read settings error: ", err);
				rej(["settings", `Couldn't read settings. Reason: ${err.message ?? err.toString() ?? "unknown"}`])
			});
});
const modifySettingsEvent = (newSettings: string) => new Promise<void>((res, rej) => {
	return modifySettings(newSettings)
		.then(() => res())
		.catch((err) => rej(["settings", `Couldn't modify settings. Reason: ${err.message ?? err.toString() ?? "unknown"}`]));
});
const writeSettingsEvent = () => new Promise<void>((res, rej) => {
	return writeSettings()
		.then(() => res())
		.catch((err) => rej(["settings/io", `Couldn't write settings to file. Reason: ${err.message ?? err.toString() ?? "unknown"}`]));
});
const forceLoadDefaultSettingsEvent = () => new Promise<string>((res, rej) => {
	return modifySettingsEvent(JSON.stringify(DEFAULT_SETTINGS))
		.then(() => readSettingsEvent())
		.catch((errData: string[]) => { 
			console.log("Force load default settings error data: ", errData);
			rej(errData);
		});
})

export {
	settings,
	loadSettings,
	readSettings,
	modifySettings,
	writeSettings,
	forceLoadDefaultSettings,
	loadSettingsEvent,
	readSettingsEvent,
	modifySettingsEvent,
	writeSettingsEvent,
	forceLoadDefaultSettingsEvent
};