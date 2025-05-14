import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ children, onClick }) => {
	return (
		<div
			id='overlay'
			className={styles.background}
			onClick={onClick}
			role='button'
			tabIndex={0}
			onKeyDown={onClick}>
			{children}
		</div>
	);
};

ModalOverlay.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
