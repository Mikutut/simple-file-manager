import { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";
import { IModal } from "../contexts/ModalProvider";

import "../styles/Modal.scss";
import Modal from "./Modal";

function ModalManager({ queue, removeFromQueue }: { queue: IModal[], removeFromQueue: () => void }) {
	const [currentModal, setCurrentModal] = useState<IModal>(null);

	const modalWrapperTransition = useTransition(currentModal, {
		from: {opacity: 0},
		enter: {opacity: 1},
		leave: {opacity: 0, delay: 100},
		delay: 0,
		exitBeforeEnter: true,
		config: {
			duration: 100
		},
		expires: true
	});
	const modalOverlayTransition = useTransition((queue.length > 0), {
		from: {opacity: 0},
		enter: {opacity: 1},
		leave: {opacity: 0},
		delay: 0,
		exitBeforeEnter: true,
		config: {
			duration: 200
		},
		expires: true
	});
	const modalTransition = useTransition(currentModal, {
		from: {opacity: 0},
		enter: {opacity: 1},
		leave: {opacity: 0},
		delay: 0,
		exitBeforeEnter: true,
		config: {
			duration: 200
		},
		expires: true
	});

	const onModalClose = () => {
		removeFromQueue();
		setCurrentModal(null);
	}

	useEffect(() => {
		if(queue.length > 0)
			setCurrentModal(queue[0]);

		return () => setCurrentModal(null);
	}, []);
	useEffect(() => {
		if(queue.length === 0) return;

		if(!currentModal) {
			setCurrentModal(queue[0]);
		}
	}, [queue, currentModal]);

	return modalWrapperTransition((modalWrapperProps, modalWrapperItem) => (
		<animated.div
			style={{...modalWrapperProps, pointerEvents: currentModal ? "auto" : "none"}}
			id="modal-wrapper"
		>
			{
				modalOverlayTransition((modalOverlayProps, modalOverlayItem) => modalOverlayItem && (
					<animated.div
						style={modalOverlayProps}
						className="modal-overlay"
						onClick={() => {
							currentModal.onClose && currentModal.onClose();
							onModalClose();
						}}
					>
					</animated.div>
				))
			}
			{
				modalTransition((modalProps, modalItem) => modalItem && (
					<Modal
						style={modalProps}
						onClose={() => {
							modalItem.onClose && modalItem.onClose();
							onModalClose();
						}}
					>
						{ (modalItem && modalItem.children) || <h1>No children</h1>  }
					</Modal>
				))
			}
		</animated.div>
	));
}

export default ModalManager;