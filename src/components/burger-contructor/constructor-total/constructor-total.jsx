import React from 'react';
import styles from './constructor-total.module.css';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	getBun,
	getConstructorIngredients,
	getTotalPrice,
} from '../../../services/constructor/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { makeOrder } from '../../../services/constructor/actions';

const ConstructorTotal = () => {
	const dispatch = useDispatch();
	const total = useSelector(getTotalPrice);
	const bun = useSelector(getBun);
	const ingredients = useSelector(getConstructorIngredients);
	let ids = ingredients.map((ingr) => ingr.item._id);
	ids = [bun?._id ?? 0, ...ids, bun?._id ?? 0];

	return (
		<p className={styles.p}>
			<span className='text text_type_digits-medium mr-1'>{total}</span>
			<CurrencyIcon type='primary' className={styles.icon} />
			<Button
				htmlType='button'
				type='primary'
				size='large'
				extraClass='ml-10'
				onClick={() => dispatch(makeOrder(ids))}>
				Оформить заказ
			</Button>
		</p>
	);
};

export default ConstructorTotal;
