import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './ingredients-list.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	DragIcon,
	ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientsList = ({ ingredients }) => {
	return (
		<ul className={styles.list}>
			{ingredients.map((item, index) => {
				return (
					<li className={styles.item} key={index}>
						<DragIcon type='primary' className={styles.dragicon} />
						<ConstructorElement
							isLocked={false}
							text={item.name}
							price={item.price}
							thumbnail={item.image}
						/>
					</li>
				);
			})}
		</ul>
	);
};

IngredientsList.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default IngredientsList;
