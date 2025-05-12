import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import IngredientImage from '@components/burger-ingredients/ingredient-image/ingredient-image';
import ListItem from '@components/burger-ingredients/ingredient-details/list-item/list-item';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientDetails = ({ item, onClose }) => {
	return (
		<div className={styles.background}>
			<div className={styles.modal}>
				<p className={styles.header}>
					<h1 className='text text_type_main-large'>Детали ингредиента</h1>
					<CloseIcon type='primary' onClick={onClose} />
				</p>
				<IngredientImage image={item.image_large} name={item.name} />
				<p className='text text_type_main-medium'>{item.name}</p>
				<ul className={styles.list}>
					<ListItem name='Калории, ккал' value={item.calories} />
					<ListItem name='Белки, г' value={item.proteins} />
					<ListItem name='Жиры, г' value={item.fat} />
					<ListItem name='Углеводы, г' value={item.carbohydrates} />
				</ul>
			</div>
		</div>
	);
};

IngredientDetails.propTypes = {
	item: ingredientPropType.isRequired,
	onClose: PropTypes.func,
};

export default IngredientDetails;
