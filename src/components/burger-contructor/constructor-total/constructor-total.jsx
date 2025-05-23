import React from 'react';
import styles from './constructor-total.module.css';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	getTotalPrice,
	submitOrder,
} from '../../../services/constructor/reducer';
import { useDispatch, useSelector } from 'react-redux';

const ConstructorTotal = () => {
	const dispatch = useDispatch();
	const total = useSelector(getTotalPrice);

	return (
		<p className={styles.p}>
			<span className='text text_type_digits-medium mr-1'>{total}</span>
			<CurrencyIcon type='primary' className={styles.icon} />
			<Button
				htmlType='button'
				type='primary'
				size='large'
				extraClass='ml-10'
				onClick={() => dispatch(submitOrder())}>
				Оформить заказ
			</Button>
		</p>
	);
};

export default ConstructorTotal;
