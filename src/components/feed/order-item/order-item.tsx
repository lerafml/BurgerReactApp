import { IOrderDetails } from '@/utils/types';
import styles from './order-item.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderIngredients } from '../order-ingredients/order-ingredients';
import { useMatch } from 'react-router-dom';

interface OrderItemProps {
	order: IOrderDetails;
}

export const OrderItem = ({ order }: OrderItemProps): React.JSX.Element => {
	const showStatus = useMatch('profile/orders');
	return (
		<div className={styles.main}>
			<section>
				<span className='text text_type_digits-default'>{`#${order.number}`}</span>
				<FormattedDate
					date={new Date(order.createdAt)}
					className='text text_type_main-default text_color_inactive'
				/>
			</section>
			<p className='text text_type_main-medium'>{order.name}</p>
			{showStatus && (
				<p className='text text_type_main-small'>
					{order.status == 'done'
						? 'Выполнен'
						: order.status == 'created'
							? 'Создан'
							: 'Готовится'}
				</p>
			)}
			<OrderIngredients ids={order.ingredients} />
		</div>
	);
};
