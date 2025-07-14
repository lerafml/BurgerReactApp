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
import { makeOrder } from '../../../services/constructor/actions';
import { getUser } from '../../../services/user/reducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@/services/store';

const ConstructorTotal = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const total = useSelector(getTotalPrice);
	const bun = useSelector(getBun);
	const user = useSelector(getUser);
	const ingredients = useSelector(getConstructorIngredients);
	let ids = ingredients.map((ingr) => ingr.item._id);
	ids = [bun?._id ?? '', ...ids, bun?._id ?? ''];

	const onOrderClick = () => {
		if (user != null) {
			dispatch(makeOrder(ids));
		} else {
			navigate('/login');
		}
	};

	return (
		<p className={styles.p}>
			<span className='text text_type_digits-medium mr-1'>{total}</span>
			<CurrencyIcon type='primary' className={styles.icon} />
			<Button
				htmlType='button'
				type='primary'
				size='large'
				extraClass='ml-10'
				onClick={onOrderClick}>
				Оформить заказ
			</Button>
		</p>
	);
};

export default ConstructorTotal;
