import React, { useState } from 'react';
import styles from './ingredient.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientImage from '@components/burger-ingredients/ingredient-image/ingredient-image';
import IngredientDetails from '@components/burger-ingredients/ingredient-details/ingredient-details';

const Ingredient = ({ item }) => {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<section
				className={styles.ingredient}
				role='button'
				tabIndex='0'
				onClick={() => setModalOpen(true)}
				onKeyDown={(e) => {
					if (e.keyCode === 13) {
						setModalOpen(true);
					}
				}}>
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
			{modalOpen && (
				<IngredientDetails item={item} onClose={() => setModalOpen(false)} />
			)}
		</>
	);
};

Ingredient.propTypes = {
	item: ingredientPropType.isRequired,
};

export default Ingredient;
