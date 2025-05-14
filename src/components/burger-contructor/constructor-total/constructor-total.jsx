import React from 'react';
import styles from './constructor-total.module.css';
import * as PropTypes from 'prop-types';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorTotal = ({ total, onSubmit }) => {
	return (
		<p className={styles.p}>
			<span className='text text_type_digits-medium mr-1'>{total}</span>
			<CurrencyIcon type='primary' className={styles.icon} />
			<Button
				htmlType='button'
				type='primary'
				size='large'
				extraClass='ml-10'
				onClick={() => onSubmit(true)}>
				Оформить заказ
			</Button>
		</p>
	);
};

ConstructorTotal.propTypes = {
	total: PropTypes.number.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default ConstructorTotal;
