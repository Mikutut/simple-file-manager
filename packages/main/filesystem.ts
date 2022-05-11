import { ipcMain, IpcMainInvokeEvent } from "electron";
import * as path from "path";
import * as fs from "fs/promises";
import { Stats } from "fs";

interface INode {
	name: string;
	path: string;
	accessTime: string;
	modifyTime: string;
	creationTime: string;
}
interface IFileNode extends INode {
	nameWithoutExtension: string;
	extension: string;
}
type IDirectoryNode = INode;
interface ISymlinkNode extends INode {
	target: string;
}
type NodeType = "file" | "directory" | "symlink";
type DirectoryContents = Array<IFileNode | IDirectoryNode | ISymlinkNode>;

const getNodeType = (path: string) => new Promise<NodeType>((res, rej) => {
	return fs.access(path)
		.then(() => fs.lstat(path))
		.then((stats: Stats) => {
			if(stats.isDirectory())
				return "directory"
			else if(stats.isFile())
				return "file"
			else if(stats.isSymbolicLink())
				return "symlink";
		})
		.catch((err) => rej(["io", `Couldn't determine node's type. Reason: ${err.message ?? err ?? "unknown"}`]));
});
const readNodeStats = (nodePath: string) => new Promise<Stats>((res, rej) =>
	fs.access(nodePath)
		.then(() => fs.lstat(nodePath))
		.then((stats) => res(stats))
		.catch((err) => rej(["io", `Couldn't read node's stats. Reason: ${err.message ?? err[1] ?? err ?? "unknown"}`]))
);
const readSymlinkTarget = (symlinkPath: string) => new Promise<string>((res, rej) => 
	getNodeType(symlinkPath)
		.then((nodeType) => {
			if(nodeType !== "symlink")
				rej(["io", `Tried to read symlink's target, got a ${nodeType} path instead. Path: ${symlinkPath}`])
			else
				return fs.readlink(symlinkPath);
		})
		.then((linkString) => res(path.join(symlinkPath, linkString)))
		.catch((err) => rej(["io", `Couldn't read symlink's target. Reason: ${err.message ?? err ?? "unknown"}`]))
);
const readDirectory = (dirPath: string) => new Promise<DirectoryContents>((res, rej) => {
	return getNodeType(dirPath)
		.then((nodeType) => {
			if(nodeType === "file")
				rej(["io", `Tried to read directory, got a file path instead. Path: ${dirPath}`])
			else if(nodeType === "symlink")
				return readSymlinkTarget(dirPath)
					.then((symPath) => fs.readdir(symPath));
			else
				return fs.readdir(dirPath)
		})
		.then((rawDirContents: string[]) => {
			const dirContents: DirectoryContents = [];

			for(const node of rawDirContents) {
				const absNodePath = path.join(dirPath, node);

				readNodeStats(absNodePath)
					.then((nodeStats) => {
						return getNodeType(absNodePath)
							.then((nodeType) => {
								if(nodeType === "file")
									dirContents.push({
										name: node,
										path: absNodePath,
										nameWithoutExtension: path.basename(node, path.extname(node)),
										extension: path.extname(node),
										accessTime: (nodeStats.atime.getTime() / 1000).toString(),
										creationTime: (nodeStats.ctime.getTime() / 1000).toString(),
										modifyTime: (nodeStats.mtime.getTime() / 1000).toString()
									} as IFileNode)
								else if(nodeType === "directory")
									dirContents.push({
										name: node,
										path: absNodePath,
										accessTime: (nodeStats.atime.getTime() / 1000).toString(),
										creationTime: (nodeStats.ctime.getTime() / 1000).toString(),
										modifyTime: (nodeStats.mtime.getTime() / 1000).toString()
									} as IDirectoryNode)
								else if(nodeType === "symlink")
									readSymlinkTarget(absNodePath)
										.then((nodeTarget) => {
											dirContents.push({
												name: node,
												path: absNodePath,
												target: nodeTarget,
												accessTime: (nodeStats.atime.getTime() / 1000).toString(),
												creationTime: (nodeStats.ctime.getTime() / 1000).toString(),
												modifyTime: (nodeStats.mtime.getTime() / 1000).toString()
											} as ISymlinkNode);
										})
										.catch(() => {
											dirContents.push({
												name: node,
												path: absNodePath,
												target: "N/A",
												accessTime: (nodeStats.atime.getTime() / 1000).toString(),
												creationTime: (nodeStats.ctime.getTime() / 1000).toString(),
												modifyTime: (nodeStats.mtime.getTime() / 1000).toString()
											});
										});
							});
					})
					.catch(() => { return; });
			}

			res(dirContents);
		})
		.catch((err) => rej(["io", `Couldn't read directory's contents. Reason: ${err.message ?? err[1] ?? err ?? "unknown"}`]))
});

const filesystemIPCHandler = () => {
	ipcMain.handle("request-async", (event: IpcMainInvokeEvent, channel: string, ...args: any[]) => {

	});
};

export {
	filesystemIPCHandler
}