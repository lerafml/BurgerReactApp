import React from 'react';
import styles from './burger-section.module.css';
import Ingredient from '@components/burger-ingredients/ingredient/ingredient';

const BurgerSection = ({ name, ingredients }) => {
	return (
		<div className={styles.burger_section}>
			<h1 className={styles.title}>{name}</h1>
			{ingredients.map((item) => {
				return <Ingredient key={item._id} item={item} />;
			})}
		</div>
	);
};

export default BurgerSection;
