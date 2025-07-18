import { IIngredient } from '@/utils/types';
import styles from './order-info-ingredient.module.css';
import { Price } from '../../price/price';

interface OrderInfoIngredientProps {
	ingredient: IIngredient;
	count: number;
}

export const OrderInfoIngredient = ({
	ingredient,
	count,
}: OrderInfoIngredientProps): React.JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<section>
				<div className={styles.gradient}>
					<span className={styles.span}>
						<img src={ingredient.image} alt={ingredient.name} />
					</span>
				</div>
				<p className='text text_type_main-default'>{ingredient.name}</p>
			</section>
			<Price price={ingredient.price} count={count} />
		</div>
	);
};
