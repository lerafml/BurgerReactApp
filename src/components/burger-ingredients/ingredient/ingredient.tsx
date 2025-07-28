import React from 'react';
import styles from './ingredient.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientImage from '@/components/burger-ingredients/ingredient-image/ingredient-image';
import { useDrag } from 'react-dnd';
import { IIngredient } from '@/utils/types';

interface IngredientProps {
	item: IIngredient;
	count: number;
}
const Ingredient = ({ item, count }: IngredientProps): React.JSX.Element => {
	const [, ref] = useDrag({
		type: 'ingredient',
		item: { item },
	});

	return (
		<section data-test='ingredient' ref={ref} className={styles.ingredient}>
			{count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
			<IngredientImage image={item.image} name={item.name} />
			<p className={`${styles.price} text text_type_digits-default mt-1 mb-1`}>
				<span>{item.price}</span>
				<CurrencyIcon type='primary' />
			</p>
			<p className={`${styles.name} text text_type_main-default`}>
				{item.name}
			</p>
		</section>
	);
};

export default Ingredient;
