import React from 'react';
import styles from './burger-section.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import Ingredient from '@components/burger-ingredients/ingredient/ingredient';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setCurrentItem } from '../../../services/ingredients/reducer';

const BurgerSection = ({ name, ingredients }) => {
	const dispatch = useDispatch();
	return (
		<div className={styles.burger_section}>
			<h1 className={styles.title}>{name}</h1>
			{ingredients.map((item) => {
				return (
					<Ingredient
						key={item._id}
						item={item}
						onClick={() => dispatch(setCurrentItem(item))}
					/>
				);
			})}
		</div>
	);
};

BurgerSection.propTypes = {
	name: PropTypes.string.isRequired,
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerSection;
