import React, { useEffect } from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { Preloader } from '@components/preloader/preloader.jsx';
import Modal from '@components/modal/modal.jsx';
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';
import OrderDetails from '../burger-contructor/order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients } from '../../services/ingredients/actions';
import {
	getAllIngredients,
	getCurrentItem,
	getIngredientsError,
	getIngredientsLoading,
	revokeCurrentItem,
} from '../../services/ingredients/reducer';
import {
	exitOrder,
	getOrderSubmitted,
} from '../../services/constructor/reducer';

export const App = () => {
	const currentItem = useSelector(getCurrentItem);
	const ingredients = useSelector(getAllIngredients);
	const loading = useSelector(getIngredientsLoading);
	const error = useSelector(getIngredientsError);
	const orderSubmitted = useSelector(getOrderSubmitted);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadIngredients());
	}, [dispatch]);

	return (
		<div className={styles.app}>
			<AppHeader />
			{error && 'Ошибка чтения данных!'}
			{loading && <Preloader />}
			{!loading && ingredients.length > 0 && (
				<>
					<h1
						className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
						Соберите бургер
					</h1>
					<main className={`${styles.main} pl-5 pr-5 mb-5`}>
						<BurgerIngredients />
						<BurgerConstructor ingredients={ingredients} />
						{currentItem !== null && (
							<Modal
								name='Детали ингредиента'
								onClose={() => dispatch(revokeCurrentItem())}>
								<IngredientDetails item={currentItem} />
							</Modal>
						)}
						{orderSubmitted && (
							<Modal onClose={() => dispatch(exitOrder())}>
								<OrderDetails id='034536' />
							</Modal>
						)}
					</main>
				</>
			)}
		</div>
	);
};
