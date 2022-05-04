function useParseError(errorType: string, errorMessage: string) {
	const errTypeB64 = window.electronAPI.nodeAPI.bufferEncode(errorType, "utf-8", "base64url");
	const errMsgB64 = window.electronAPI.nodeAPI.bufferEncode(errorMessage, "utf-8", "base64url");

	return [ errTypeB64, errMsgB64 ];
}

export default useParseError;