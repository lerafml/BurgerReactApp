import React from 'react';
import styles from './ingredient-details.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import IngredientImage from '@components/burger-ingredients/ingredient-image/ingredient-image';
import ListItem from '@components/burger-ingredients/ingredient-details/list-item/list-item';

const IngredientDetails = ({ item }) => {
	return (
		<>
			<IngredientImage image={item.image_large} name={item.name} />
			<p className='text text_type_main-medium'>{item.name}</p>
			<ul className={styles.list}>
				<ListItem name='Калории, ккал' value={item.calories} />
				<ListItem name='Белки, г' value={item.proteins} />
				<ListItem name='Жиры, г' value={item.fat} />
				<ListItem name='Углеводы, г' value={item.carbohydrates} />
			</ul>
		</>
	);
};

IngredientDetails.propTypes = {
	item: ingredientPropType.isRequired,
};

export default IngredientDetails;
