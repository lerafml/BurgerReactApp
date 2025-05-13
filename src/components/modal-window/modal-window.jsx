import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-window.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ModalWindow = ({ name, children, onClose }) => {
	return (
		<div className={styles.background}>
			<div className={styles.modal}>
				<section className={styles.header}>
					<h1 className='text text_type_main-large'>{name}</h1>
					<span className={styles.icon}>
						<CloseIcon type='primary' onClick={onClose} />
					</span>
				</section>
				{children}
			</div>
		</div>
	);
};

ModalWindow.propTypes = {
	name: PropTypes.string,
	children: PropTypes.node.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default ModalWindow;
