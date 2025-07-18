import styles from './price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface PriceProps {
	price: number;
	count?: number;
}

export const Price = ({ price, count }: PriceProps): React.JSX.Element => {
	return (
		<p className={`${styles.price} text text_type_digits-default`}>
			{count && (
				<span>
					{count} x {price}
				</span>
			)}
			{!count && <span>{price}</span>}
			<CurrencyIcon type='primary' />
		</p>
	);
};
