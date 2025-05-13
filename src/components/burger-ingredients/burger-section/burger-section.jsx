import React from 'react';
import styles from './burger-section.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import Ingredient from '@components/burger-ingredients/ingredient/ingredient';
import PropTypes from 'prop-types';

const BurgerSection = ({ name, ingredients, onSelect }) => {
	return (
		<div className={styles.burger_section}>
			<h1 className={styles.title}>{name}</h1>
			{ingredients.map((item) => {
				return <Ingredient key={item._id} item={item} onClick={onSelect} />;
			})}
		</div>
	);
};

BurgerSection.propTypes = {
	name: PropTypes.string.isRequired,
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default BurgerSection;
