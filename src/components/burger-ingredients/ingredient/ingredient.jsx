import React from 'react';
import styles from './ingredient.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientImage from '@components/burger-ingredients/ingredient-image/ingredient-image';

const Ingredient = ({ item }) => {
	return (
		<section className={styles.ingredient}>
			<Counter count={1} size='default' extraClass='m-1' />
			<IngredientImage image={item.image} name={item.name} />
			<p
				className='text text_type_digits-default mt-1 mb-1'
				style={{ display: 'flex' }}>
				<span className='pr-1'>{item.price}</span>
				<CurrencyIcon type='primary' />
			</p>
			<p
				className='text text_type_main-default'
				style={{ textAlign: 'center' }}>
				{item.name}
			</p>
		</section>
	);
};

Ingredient.propTypes = {
	item: ingredientPropType.isRequired,
};

export default Ingredient;
