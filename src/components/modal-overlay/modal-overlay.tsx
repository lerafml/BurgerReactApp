import React from 'react';
import styles from './modal-overlay.module.css';

interface ModalOverlayProps {
	children: React.JSX.Element;
	onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
	onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}
const ModalOverlay = ({
	children,
	onClick,
	onKeyDown,
}: ModalOverlayProps): React.JSX.Element => {
	return (
		<div
			id='overlay'
			className={styles.background}
			onClick={onClick}
			role='button'
			tabIndex={0}
			onKeyDown={onKeyDown}>
			{children}
		</div>
	);
};

export default ModalOverlay;
