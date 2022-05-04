import { app, ipcMain } from "electron";
import path from "path";
import * as fs from "fs/promises";
import { IError, ErrorType, ISettings, InitMode } from "./common";

const SETTINGS_PATH = path.join(app.getPath("userData"), "settings.json");

let settings: ISettings;

ipcMain.handle("request-load-settings", () => {
	fs.readFile(SETTINGS_PATH, { encoding: "utf-8", flag: 'r'})
		.then((rawSettings: string) => {
			settings = JSON.parse(rawSettings);
		})
		.catch((err: Error) => Promise.reject<IError>({
			type: "io",
			message: err.message
		}));
});