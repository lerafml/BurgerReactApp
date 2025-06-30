import React from 'react';
import styles from './order-details.module.css';
import done from '../../../images/done.png';

interface OrderDetailsProps {
	id: number;
}
const OrderDetails = ({ id }: OrderDetailsProps): React.JSX.Element => {
	return (
		<>
			<p className='text text_type_digits-large mb-8'>{id}</p>
			<p className='text text_type_main-default mb-15'>идентификатор заказа</p>
			<img src={done} alt='Check' className={`${styles.image} mb-15`} />
			<p className='text text_type_main-small mb-2'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-small text_color_inactive'>
				Дождитесь готовности на орбитальной станции
			</p>
		</>
	);
};

export default OrderDetails;
