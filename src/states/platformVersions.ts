import { atom } from "recoil";

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
	electronVersionState
};