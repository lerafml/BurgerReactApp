import React from 'react';
import styles from './ingredient.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientImage from '@components/burger-ingredients/ingredient-image/ingredient-image';
import PropTypes from 'prop-types';

const Ingredient = ({ item, onClick }) => {
	return (
		<section
			className={styles.ingredient}
			role='button'
			tabIndex='0'
			onClick={() => {
				onClick(item);
			}}
			onKeyDown={(e) => {
				if (e.keyCode === 13) {
					onClick(item);
				}
			}}>
			<Counter count={1} size='default' extraClass='m-1' />
			<IngredientImage image={item.image} name={item.name} />
			<p className={`${styles.price} text text_type_digits-default mt-1 mb-1`}>
				<span className='pr-1'>{item.price}</span>
				<CurrencyIcon type='primary' />
			</p>
			<p className={`${styles.name} text text_type_main-default`}>
				{item.name}
			</p>
		</section>
	);
};

Ingredient.propTypes = {
	item: ingredientPropType.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default Ingredient;
