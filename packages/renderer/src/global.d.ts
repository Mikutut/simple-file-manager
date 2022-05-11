import { IElectronAPI } from "@c/common";

declare global {
	interface Window {
		electronAPI: IElectronAPI;
	}
}