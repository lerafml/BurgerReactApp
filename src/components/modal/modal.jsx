import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '@components/modal-overlay/modal-overlay.jsx';

const Modal = ({ name, children, onClose }) => {
	const modalRoot = document.getElementById('modal');

	return ReactDOM.createPortal(
		<ModalOverlay
			onClick={(e) => {
				if (e.target.id === 'overlay') {
					onClose();
				}
			}}>
			<div
				className={styles.modal}
				onKeyDown={(e) => {
					if (e.key === 'Escape') {
						onClose();
					}
				}}
				role='button'
				tabIndex={'0'}>
				<section className={styles.header}>
					<h1 className='text text_type_main-large'>{name}</h1>
					<span className={styles.icon}>
						<CloseIcon type='primary' onClick={onClose} />
					</span>
				</section>
				{children}
			</div>
		</ModalOverlay>,
		modalRoot
	);
};

Modal.propTypes = {
	name: PropTypes.string,
	children: PropTypes.node.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default Modal;
