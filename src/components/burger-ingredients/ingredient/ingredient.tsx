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
	onClick: (item: IIngredient) => void;
}
const Ingredient = ({
	item,
	count,
	onClick,
}: IngredientProps): React.JSX.Element => {
	const [, ref] = useDrag({
		type: 'ingredient',
		item: { item },
	});

	return (
		<section
			ref={ref}
			className={styles.ingredient}
			role='button'
			tabIndex={0}
			onClick={() => {
				onClick(item);
			}}
			onKeyDown={(e) => {
				if (e.keyCode === 13) {
					onClick(item);
				}
			}}>
			{count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
			<IngredientImage image={item.image} name={item.name} />
			<p className={`${styles.price} text text_type_digits-default mt-1 mb-1`}>
				<span className='pr-1'>{item.price}</span>
				<CurrencyIcon type='primary' />
			</p>
			<p className={`${styles.name} text text_type_main-default`}>
				{item.name}
			</p>
		</section>
	);
};

export default Ingredient;
