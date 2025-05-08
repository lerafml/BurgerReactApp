import React from 'react';
import styles from './burger-section.module.css';

const BurgerSection = ({ name, ingredients }) => {
	return (
		<div className={styles.burger_section}>
			<h1>{name}</h1>
			{ingredients.map((item) => {
				return (
					<section key={item._id}>
						<img src={item.image} alt={item.name} />
					</section>
				);
			})}
		</div>
	);
};

export default BurgerSection;
