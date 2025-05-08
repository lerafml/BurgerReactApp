import React from 'react';
import styles from './burger-ingredients.module.css';
import * as PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types.js';
import BurgerSection from '@components/burger-ingredients/burger-section/burger-section';

export const BurgerIngredients = ({ ingredients }) => {
	console.log(ingredients.filter((i) => i.type === 'bun'));

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab value='bun' active={true} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='main' active={false} onClick={() => {}}>
						Начинки
					</Tab>
					<Tab value='sauce' active={false} onClick={() => {}}>
						Соусы
					</Tab>
				</ul>
			</nav>
			<div style={{ overflow: 'scroll' }} className='custom-scroll mb-10'>
				<BurgerSection
					name='Булки'
					ingredients={ingredients.filter((i) => i.type === 'bun')}
				/>
				<BurgerSection
					name='Начинки'
					ingredients={ingredients.filter((i) => i.type === 'main')}
				/>
				<BurgerSection
					name='Соусы'
					ingredients={ingredients.filter((i) => i.type === 'sauce')}
				/>
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
