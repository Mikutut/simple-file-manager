import { app, ipcMain } from "electron";
import path from "path";
import * as fs from "fs/promises";
import { ISettings } from "./common";

const SETTINGS_PATH = path.join(app.getPath("userData"), "settings.json");

let settings: ISettings;

const SETTINGS_IPC_HANDLERS = () => {
	ipcMain.on("request", (event, channel, ...args) => {
		switch(channel) {
			case "load-settings": {
				fs.readFile(SETTINGS_PATH, { encoding: "base64", flag: 'r'})
					.then((rawSettings: string) => {
						try {
							settings = JSON.parse(Buffer.from(rawSettings, "base64").toString("utf-8"));
							event.sender.send("response", "load-settings");
						} catch(err) {
							event.sender.send("response", "error-thrown", "settings", err.message ?? "Unknown error");
						}
					})
					.catch((err: Error) => { 
						if(!err.message.startsWith("ENOENT")) {
							event.sender.send("response", "error-thrown", "settings/io", err.message ?? "Unknown error");
						} else {
							fs.writeFile(SETTINGS_PATH, "", "utf-8")
								.then(() => event.sender.send("response-load-settings"))
								.catch((err) => { 
									event.sender.send("response", "error-thrown", "settings/io", err.message ?? "Unknown error");
								});
						}
					});
			}
			break;
			case "read-settings": {
				try {
					event.sender.send("response", "read-settings", JSON.stringify(settings));
				} catch(err) {
					event.sender.send("response", "error-thrown", "settings", `Couldn't read settings. Reason: ${err.message ?? "unknown"}`);
				}
			}
			break;
			case "modify-settings": {
				try {
					const modifiedSettings = JSON.parse(args[0]);
					settings = modifiedSettings;
					event.sender.send("response", "modify-settings");
				} catch(err) {
					event.sender.send("response", "error-thrown", "settings", `Couldn't modify settings. Reason: ${err.message ?? "unknown"}`);
				}
			}
			break;
			case "write-settings": {
				fs.writeFile(SETTINGS_PATH, JSON.stringify(settings), "base64")
					.then(() => event.sender.send("response", "write-settings"))
					.catch((err) => event.sender.send("response", "error-thrown", "settings/io", err.message ?? "Unknown error"));
			}
			break;
		}
	});
};

export {
	SETTINGS_IPC_HANDLERS
};