import React from 'react';
import PropTypes from 'prop-types';
import done from '../../../images/done.png';

const OrderDetails = ({ id }) => {
	return (
		<>
			<p className='text text_type_digits-large mb-8'>{id}</p>
			<p className='text text_type_main-default mb-15'>идентификатор заказа</p>
			<img
				src={done}
				alt='Check'
				style={{ width: 120, alignSelf: 'center' }}
				className='mb-15'
			/>
			<p className='text text_type_main-small mb-2'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-small text_color_inactive'>
				Дождитесь готовности на орбитальной станции
			</p>
		</>
	);
};

OrderDetails.propTypes = {
	id: PropTypes.string.isRequired,
};

export default OrderDetails;
