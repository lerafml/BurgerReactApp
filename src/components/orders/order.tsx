import { profileConnect, profileDisconnect } from '@/services/profile/actions';
import { getProfileOrders } from '@/services/profile/reducer';
import { useDispatch, useSelector } from '@/services/store';
import { PROFILE_ORDERS_URL } from '@/utils/api';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { OrderItem } from '../feed/order-item/order-item';
import styles from './order.module.css';

export const Orders = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const location = useLocation();
	const orders = useSelector(getProfileOrders) ?? [];
	const sortedOrders = [...orders].sort((a, b) => {
		return +new Date(b.createdAt).getTime() - +new Date(a.createdAt).getTime();
	});

	useEffect(() => {
		dispatch(
			profileConnect(
				`${PROFILE_ORDERS_URL}?token=${localStorage.getItem('accessToken')?.replace('Bearer ', '')}`
			)
		);
		return () => {
			dispatch(profileDisconnect());
		};
	}, [dispatch]);

	return (
		<div className={styles.wrapper}>
			{sortedOrders.map((order) => (
				<Link
					key={order._id}
					to={`/profile/orders/${order.number}`}
					state={{ backgroundLocation: location }}>
					<OrderItem order={order} />
				</Link>
			))}
		</div>
	);
};
