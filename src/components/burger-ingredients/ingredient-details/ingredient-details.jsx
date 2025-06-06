import React from 'react';
import styles from './ingredient-details.module.css';
import IngredientImage from '@components/burger-ingredients/ingredient-image/ingredient-image';
import ListItem from '@components/burger-ingredients/ingredient-details/list-item/list-item';
import { useParams } from 'react-router-dom';
import { getAllIngredients } from '../../../services/ingredients/reducer';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
	let params = useParams();
	let ingredients = useSelector(getAllIngredients);
	let item = ingredients.filter((ingr) => ingr._id === params.id)[0];

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

export default IngredientDetails;
