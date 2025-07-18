import { useDispatch, useSelector } from '@/services/store';
import { useParams } from 'react-router-dom';
import styles from './order-info.module.css';
import { getAllIngredients } from '@/services/ingredients/reducer';
import { IIngredient } from '@/utils/types';
import { useEffect, useMemo } from 'react';
import { OrderInfoIngredient } from './order-info-ingredient/order-info-ingredient';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { loadOrder } from '@/services/feed/actions';
import { Price } from '../price/price';

export const OrderInfo = (): React.JSX.Element => {
	const { number } = useParams();
	const dispatch = useDispatch();
	const item = useSelector((state) => {
		let order = state.feed.orders.find((o) => o.number === Number(number));
		if (order) {
			return order;
		}

		order = state.profile.orders.find((o) => o.number === Number(number));
		if (order) {
			return order;
		}

		return state.feed.order;
	});
	const ingredients = useSelector(getAllIngredients);
	const currentIngredients: IIngredient[] = useMemo(() => {
		return (
			(item?.ingredients
				?.map((id) => ingredients.find((i) => i._id === id))
				?.filter(Boolean) as IIngredient[]) || []
		);
	}, [item, ingredients]);
	const uniqueIngredients = useMemo(() => {
		return [...new Set(currentIngredients)];
	}, [currentIngredients]);
	const totalPrice = useMemo(() => {
		return (currentIngredients || []).reduce(
			(sum, ingr) => sum + ingr.price,
			0
		);
	}, [currentIngredients]);

	useEffect(() => {
		if (!item) {
			dispatch(loadOrder(Number(number)));
		}
	}, [dispatch, item, number]);

	if (!item) {
		return <p>Loading...</p>;
	}

	return (
		<div className={styles.wrapper}>
			<p
				className={`${styles.number} text text_type_digits-default mb-10`}>{`#${item.number}`}</p>
			<h3 className={`${styles.name} text text_type_main-medium mb-3`}>
				{item.name}
			</h3>
			<p className={`${styles.status} text text_type_main-small mb-15`}>
				{item.status == 'done'
					? 'Выполнен'
					: item.status == 'created'
						? 'Создан'
						: 'Готовится'}
			</p>
			<p className='text text_type_main-medium mb-6'>Состав:</p>
			<div className={styles.ingredients}>
				{uniqueIngredients.map((ingr) => (
					<OrderInfoIngredient
						key={ingr._id}
						ingredient={ingr}
						count={currentIngredients.filter((i) => i._id == ingr._id).length}
					/>
				))}
			</div>
			<section className={styles.footer}>
				<FormattedDate
					date={new Date(item.createdAt)}
					className='text text_type_main-default text_color_inactive'
				/>
				<Price price={totalPrice} />
			</section>
		</div>
	);
};
