import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import ModalManager from "../components/ModalManager";

interface IModal {
	children: JSX.Element | React.ReactNode,
	onClose: (() => void) | null
}
type ModalProviderValue = (modal: IModal) => void;


const ModalContext = createContext<ModalProviderValue>(() => {});

function ModalProvider({ children }: { children: ReactNode }) {
	const [ modalQueue, setModalQueue ] = useState<IModal[]>([]);

	const addToQueue = (modal: IModal) => {
		console.log("Adding new modal to the queue...");

		setModalQueue((oldQueue) => { 
			return [ ...oldQueue, modal ];
		});
	}

	const removeFromQueue = () => {
		console.log("Removing modal from the queue...");

		setModalQueue(oldQueue => {
			return oldQueue.slice(1);
		});
	}

	useEffect(() => {
		console.log(modalQueue);
	}, [modalQueue]);

	return (
		<ModalContext.Provider value={addToQueue}>
			{ children }
			<ModalManager queue={modalQueue} removeFromQueue={removeFromQueue} />
		</ModalContext.Provider>
	)
}

function useModal() {
	const modalContext = useContext(ModalContext);

	if(!modalContext) {
		throw new Error(`No "ModalProvider" found! Make sure it is present in the root of React application!`);
	}

	return modalContext;
}

export default ModalProvider;
export {
	useModal
};
export type {
	IModal
};