import { getAllIngredients } from '@/services/ingredients/reducer';
import { useSelector } from '@/services/store';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-ingredients.module.css';
import { IIngredient } from '@/utils/types';

interface OrderIngredientsProps {
	ids: Array<string>;
}

export const OrderIngredients = ({
	ids,
}: OrderIngredientsProps): React.JSX.Element => {
	const ingredients = useSelector(getAllIngredients);
	const currentIngredients: IIngredient[] = ids
		.map((id) => ingredients.find((i) => i._id === id))
		.filter(Boolean) as IIngredient[];
	const totalPrice = currentIngredients.reduce(
		(sum, ingr) => sum + ingr.price,
		0
	);

	return (
		<section>
			<div className={styles.images}>
				{currentIngredients.splice(0, 6).map((ingr, index) => (
					<div className={styles.gradient} key={index}>
						<span className={styles.span}>
							<img src={ingr.image} alt={ingr.name} />
							{index == 5 && (
								<span
									className={`${styles.extra} text text_type_main-default`}>{`+${ids.length - 5}`}</span>
							)}
						</span>
					</div>
				))}
			</div>
			<p className='text text_type_digits-default'>
				{totalPrice}
				<CurrencyIcon type='primary' />
			</p>
		</section>
	);
};
