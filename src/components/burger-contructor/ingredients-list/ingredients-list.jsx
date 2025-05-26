import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './ingredients-list.module.css';
import { constructorIngredientPropType } from '@utils/prop-types.js';
import { ListItem } from './list-item/list-item';

const IngredientsList = ({ ingredients }) => {
	return (
		<ul className={styles.list}>
			{ingredients.map((item, index) => {
				return <ListItem item={item} index={index} key={item.key} />;
			})}
		</ul>
	);
};

IngredientsList.propTypes = {
	ingredients: PropTypes.arrayOf(constructorIngredientPropType.isRequired)
		.isRequired,
};

export default IngredientsList;
