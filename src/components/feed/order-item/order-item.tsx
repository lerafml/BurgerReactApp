import { IOrderDetails } from '@/utils/types';
import styles from './order-item.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderIngredients } from '../order-ingredients/order-ingredients';

interface OrderItemProps {
	order: IOrderDetails;
	status: boolean;
}

export const OrderItem = ({
	order,
	status,
}: OrderItemProps): React.JSX.Element => {
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
			{status && (
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
