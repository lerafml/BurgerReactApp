import React from 'react';
import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from '@components/burger-contructor/ingredients-list/ingredients-list';
import ConstructorTotal from '@components/burger-contructor/constructor-total/constructor-total';

export const BurgerConstructor = ({ ingredients, onSubmit }) => {
	return (
		<section className={styles.burger_constructor}>
			<ConstructorElement
				isLocked={true}
				text={`${ingredients[0].name} (верх)`}
				price={ingredients[0].price}
				thumbnail={ingredients[0].image}
				key={-1}
				extraClass='ml-8'
				type='top'
			/>
			<IngredientsList
				ingredients={ingredients.filter((i) => i.type !== 'bun')}
			/>
			<ConstructorElement
				isLocked={true}
				text={`${ingredients[0].name} (низ)`}
				price={ingredients[0].price}
				thumbnail={ingredients[0].image}
				extraClass='ml-8'
				key={-2}
				type='bottom'
			/>
			<ConstructorTotal total={1000} onSubmit={onSubmit} />
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
	onSubmit: PropTypes.func.isRequired,
};
