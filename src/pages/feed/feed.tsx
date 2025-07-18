import { wsConnect, wsDisconnect } from '@/services/feed/actions';
import {
	getFeed,
	getFeedByStatus,
	getFeedTotal,
	getFeedTotalToday,
} from '@/services/feed/reducer';
import { useDispatch, useSelector } from '@/services/store';
import { FEED_URL } from '@/utils/api';
import { useEffect } from 'react';
import styles from './feed.module.css';
import { OrderItem } from '@/components/feed/order-item/order-item';
import { Link, useLocation } from 'react-router-dom';

export const Feed = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const location = useLocation();
	const orders = useSelector(getFeed);
	const total = useSelector(getFeedTotal);
	const totalToday = useSelector(getFeedTotalToday);
	const ordersByStatus = useSelector(getFeedByStatus);

	useEffect(() => {
		dispatch(wsConnect(FEED_URL));
		return () => {
			dispatch(wsDisconnect());
		};
	}, [dispatch]);

	return (
		<>
			<h1 className={`${styles.header} text text_type_main-large`}>
				Лента заказов
			</h1>
			<main className={styles.main}>
				<div className={styles.feed}>
					{orders.map((order) => (
						<Link
							key={order._id}
							to={`/feed/${order.number}`}
							state={{ backgroundLocation: location }}>
							<OrderItem order={order} />
						</Link>
					))}
				</div>
				<div className={styles.feed_info}>
					<section className={styles.status}>
						<article>
							<h3 className='text text_type_main-default'>Готовы:</h3>
							<div>
								{ordersByStatus
									.get('done')
									?.slice(0, 10)
									.map((order) => (
										<p
											className={`${styles.ready} text text_type_digits-default`}
											key={order._id}>
											{order.number}
										</p>
									))}
							</div>
						</article>
						<article>
							<h3 className='text text_type_main-default'>В работе:</h3>
							<div>
								{ordersByStatus
									.get('created')
									?.slice(0, 10)
									.map((order) => (
										<p
											className='text text_type_digits-default'
											key={order._id}>
											{order.number}
										</p>
									))}
							</div>
						</article>
					</section>
					<section>
						<h3 className='text text_type_main-default'>
							Выполнено за все время:
						</h3>
						<p className='text text_type_digits-large'>{total}</p>
					</section>
					<section>
						<h3 className='text text_type_main-default'>
							Выполнено за сегодня:
						</h3>
						<p className='text text_type_digits-large'>{totalToday}</p>
					</section>
				</div>
			</main>
		</>
	);
};
