import React from 'react';
import styles from './ingredient.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = ({ item }) => {
	return (
		<section className={styles.ingredient}>
			<Counter count={1} size='default' extraClass='m-1' />
			<img src={item.image} alt={item.name} />
			<p className='text text_type_digits-default'>{item.price}</p>
			<p className='text text_type_main-default'>{item.name}</p>
		</section>
	);
};

export default Ingredient;
