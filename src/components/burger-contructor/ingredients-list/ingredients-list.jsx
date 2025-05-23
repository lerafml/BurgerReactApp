import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './ingredients-list.module.css';
import { constructorIngredientPropType } from '@utils/prop-types.js';
import {
	DragIcon,
	ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientsList = ({ ingredients }) => {
	return (
		<ul className={styles.list}>
			{ingredients.map((item) => {
				return (
					<li className={styles.item} key={item.key}>
						<DragIcon type='primary' className={styles.dragicon} />
						<ConstructorElement
							isLocked={false}
							text={item.item.name}
							price={item.item.price}
							thumbnail={item.item.image}
						/>
					</li>
				);
			})}
		</ul>
	);
};

IngredientsList.propTypes = {
	ingredients: PropTypes.arrayOf(constructorIngredientPropType.isRequired)
		.isRequired,
};

export default IngredientsList;
