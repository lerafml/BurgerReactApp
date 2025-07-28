import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '@/components/modal-overlay/modal-overlay.js';

interface ModalProps {
	name?: string;
	children: React.JSX.Element;
	onClose: () => void;
}
const Modal = ({ name, children, onClose }: ModalProps): React.JSX.Element => {
	const modalRoot = document.getElementById('modal');

	useEffect(() => {
		function closeByEscape(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				onClose();
			}
		}

		document.addEventListener('keydown', closeByEscape);
		return () => {
			document.removeEventListener('keydown', closeByEscape);
		};
	}, [onClose]);

	if (!modalRoot) {
		return <></>;
	}

	return ReactDOM.createPortal(
		<ModalOverlay
			onClick={(e: React.MouseEvent<HTMLDivElement>) => {
				const target = e.target as HTMLDivElement;
				if (target.id === 'overlay') {
					onClose();
				}
			}}
			onKeyDown={(e: React.KeyboardEvent) => {
				const target = e.target as HTMLDivElement;
				if (target.id === 'overlay') {
					onClose();
				}
			}}>
			<div
				data-test='modal'
				className={styles.modal}
				role='button'
				tabIndex={0}>
				<section className={styles.header}>
					<h1 className='text text_type_main-large'>{name}</h1>
					<span data-test='closeBtn' className={styles.icon}>
						<CloseIcon type='primary' onClick={onClose} />
					</span>
				</section>
				{children}
			</div>
		</ModalOverlay>,
		modalRoot
	);
};

export default Modal;
