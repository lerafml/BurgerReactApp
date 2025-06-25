import React from 'react';
import styles from './home.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import Modal from '@components/modal/modal.jsx';
import OrderDetails from '@components/burger-contructor/order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import {
	exitOrder,
	getOrder,
	getOrderPending,
} from '../../services/constructor/reducer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Preloader } from '@components/preloader/preloader.jsx';

export const Home = () => {
	const order = useSelector(getOrder);
	const isOrderPending = useSelector(getOrderPending);
	const dispatch = useDispatch();

	return (
		<>
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<DndProvider backend={HTML5Backend}>
				<main className={`${styles.main} pl-5 pr-5 mb-5`}>
					<BurgerIngredients />
					<BurgerConstructor />
					{isOrderPending && (
						<Modal onClose={() => {}}>
							<p className='text text_type_main-medium'>Оформляем заказ...</p>
							<Preloader />
						</Modal>
					)}
					{order && (
						<Modal onClose={() => dispatch(exitOrder())}>
							<OrderDetails id={order} />
						</Modal>
					)}
				</main>
			</DndProvider>
		</>
	);
};
