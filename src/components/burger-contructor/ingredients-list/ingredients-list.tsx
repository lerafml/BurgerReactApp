import React from 'react';
import styles from './ingredients-list.module.css';
import { ListItem } from './list-item/list-item';
import { ConstructorIngredient } from '@/utils/types';

interface IngredientsListProps {
	ingredients: ConstructorIngredient[];
}
const IngredientsList = ({
	ingredients,
}: IngredientsListProps): React.JSX.Element => {
	return (
		<ul className={styles.list}>
			{ingredients.map((item, index) => {
				return <ListItem item={item} index={index} key={item.key} />;
			})}
		</ul>
	);
};

export default IngredientsList;
