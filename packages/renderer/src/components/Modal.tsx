import { animated } from "react-spring";
import { ReactNode, createContext, useContext } from "react";

import "../styles/Modal.scss";

type ModalInnerContextValue = () => void;

const ModalInnerContext = createContext<ModalInnerContextValue>(() => {});

function Modal({ children, onClose, style }: { children: ReactNode, onClose: () => void, style: any }) {
	return (
		<ModalInnerContext.Provider value={ onClose }>
			<animated.div className="modal" style={style}>
				{ children }
			</animated.div>
		</ModalInnerContext.Provider>
	);
}

function useModalOnClose() {
	const onClose = useContext(ModalInnerContext);

	return onClose;
}

export default Modal;
export {
	useModalOnClose
};