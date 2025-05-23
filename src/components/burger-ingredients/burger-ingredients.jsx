import React from 'react';
import styles from './burger-ingredients.module.css';
import * as PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerSection from '@components/burger-ingredients/burger-section/burger-section';
import { useSelector } from 'react-redux';
import { getIngredientsByType } from '../../services/ingredients/reducer';

export const BurgerIngredients = ({ onSelect }) => {
	const ingredients = useSelector(getIngredientsByType);

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
			<div className={`${styles.sections} custom-scroll`}>
				<BurgerSection
					name='Булки'
					ingredients={ingredients.get('bun')}
					onSelect={onSelect}
				/>
				<BurgerSection
					name='Начинки'
					ingredients={ingredients.get('main')}
					onSelect={onSelect}
				/>
				<BurgerSection
					name='Соусы'
					ingredients={ingredients.get('sauce')}
					onSelect={onSelect}
				/>
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	onSelect: PropTypes.func.isRequired,
};
