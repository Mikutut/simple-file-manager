import { atom } from "recoil";

const titleBarLabelState = atom({
	key: "titleBarLabel",
	default: "Simple File Manager"
});
const chromeVersionState = atom({
	key: "chromeVersion",
	default: ""
});
const nodeVersionState = atom({
	key: "nodeVersion",
	default: ""
});
const electronVersionState = atom({
	key: "electronVersion",
	default: ""
});

export {
	chromeVersionState,
	nodeVersionState,
	electronVersionState,
	titleBarLabelState
};