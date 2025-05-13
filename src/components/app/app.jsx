import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { Preloader } from '@components/preloader/preloader.jsx';
import ModalWindow from '@components/modal-window/modal-window.jsx';
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';

export const App = () => {
	const URL = 'https://norma.nomoreparties.space/api/ingredients';
	const [currentItem, setCurrentItem] = useState(null);
	const [state, setState] = useState({
		isLoaded: false,
		hasError: false,
		ingredients: [],
	});

	useEffect(() => {
		getIngredients();
	}, []);

	const getIngredients = () => {
		fetch(URL)
			.then((res) => res.json())
			.then((data) => {
				setState({ ...state, ingredients: data.data, isLoaded: true });
			})
			.catch(() => {
				setState({ ...state, hasError: true, isLoaded: false });
			});
	};

	return (
		<div className={styles.app}>
			<AppHeader />
			{state.hasError && 'Ошибка чтения данных!'}
			{!state.isLoaded && <Preloader />}
			{state.isLoaded && (
				<>
					<h1
						className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
						Соберите бургер
					</h1>
					<main className={`${styles.main} pl-5 pr-5 mb-5`}>
						<BurgerIngredients
							ingredients={state.ingredients}
							onSelect={setCurrentItem}
						/>
						<BurgerConstructor ingredients={state.ingredients} />
						{currentItem !== null && (
							<ModalWindow
								name='Детали ингредиента'
								onClose={() => setCurrentItem(null)}>
								<IngredientDetails item={currentItem} />
							</ModalWindow>
						)}
					</main>
				</>
			)}
		</div>
	);
};
