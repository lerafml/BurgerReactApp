import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from '@components/burger-contructor/ingredients-list/ingredients-list';
import ConstructorTotal from '@components/burger-contructor/constructor-total/constructor-total';
import {
	addIngredient,
	getBun,
	getConstructorIngredients,
} from '../../services/constructor/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

export const BurgerConstructor = () => {
	const dispatch = useDispatch();
	const bun = useSelector(getBun);
	const ingredients = useSelector(getConstructorIngredients);

	const [{ isOver }, dropRef] = useDrop({
		accept: 'ingredient',
		drop(item) {
			dispatch(addIngredient(item));
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const borderStyle = isOver ? 'dashed' : '';
	return (
		<section className={`${styles.burger_constructor} `} ref={dropRef}>
			{bun ? (
				<div>
					<ConstructorElement
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
						key={-1}
						extraClass='ml-8'
						type='top'
					/>
				</div>
			) : (
				<div
					className={`${styles.top} text text_type_main-small`}
					style={{ borderStyle }}>
					Выберите булки
				</div>
			)}
			{ingredients.length > 0 ? (
				<IngredientsList ingredients={ingredients} />
			) : (
				<div
					className={`${styles.ingredients} text text_type_main-small`}
					style={{ borderStyle }}>
					Выберите начинку
				</div>
			)}
			{bun ? (
				<div>
					<ConstructorElement
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
						extraClass='ml-8'
						key={-2}
						type='bottom'
					/>
				</div>
			) : (
				<div
					className={`${styles.bottom} text text_type_main-small`}
					style={{ borderStyle }}>
					Выберите булки
				</div>
			)}
			<ConstructorTotal />
		</section>
	);
};
