import { atom } from "recoil";
import { ISettingsScheme, DEFAULT_SETTINGS } from "@c/common";

const titleBarLabelState = atom({
	key: "titleBarLabel",
	default: "Simple File Manager"
});
const chromeVersionState = atom({
	key: "chromeVersion",
	default: "N/A"
});
const nodeVersionState = atom({
	key: "nodeVersion",
	default: "N/A"
});
const electronVersionState = atom({
	key: "electronVersion",
	default: "N/A"
});
const settingsState = atom<ISettingsScheme>({
	key: "settings",
	default: JSON.parse(JSON.stringify(DEFAULT_SETTINGS)) as ISettingsScheme
});
const currentDirectoryState = atom<string>({
	key: "currentDirectory",
	default: ""
});

export {
	chromeVersionState,
	nodeVersionState,
	electronVersionState,
	titleBarLabelState,
	settingsState,
	currentDirectoryState
};