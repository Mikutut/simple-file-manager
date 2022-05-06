import { atom } from "recoil";
import { ISettings } from "./common";

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
const settingsState = atom<ISettings>({
	key: "settings",
	default: []
});

export {
	chromeVersionState,
	nodeVersionState,
	electronVersionState,
	titleBarLabelState,
	settingsState
};