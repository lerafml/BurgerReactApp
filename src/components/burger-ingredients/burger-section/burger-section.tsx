import styles from './burger-section.module.css';
import Ingredient from '@/components/burger-ingredients/ingredient/ingredient';
import {
	getBun,
	getConstructorIngredients,
} from '../../../services/constructor/reducer';
import { Link, useLocation } from 'react-router-dom';
import { IIngredient } from '@/utils/types';
import { useSelector } from '@/services/store';

interface BurgerSectionProps {
	name: string;
	ingredients: IIngredient[] | undefined;
}

const BurgerSection = ({
	name,
	ingredients,
}: BurgerSectionProps): React.JSX.Element => {
	const location = useLocation();
	const constructorBun = useSelector(getBun);
	const constructorIngredients = useSelector(getConstructorIngredients);
	const counters: { [key: string]: number } = {};

	if (typeof ingredients === 'undefined') return <></>;

	if (name === 'Булки') {
		Object.assign(
			counters,
			...ingredients.map((item) => {
				return {
					[item._id]: (constructorBun?._id ?? 0) === item._id ? 2 : 0,
				};
			})
		);
	} else {
		Object.assign(
			counters,
			...ingredients.map((item) => {
				return {
					[item._id]: constructorIngredients.filter(
						(ci) => ci.item._id === item._id
					).length,
				};
			})
		);
	}

	return (
		<div className={styles.burger_section}>
			<h1 className={styles.title}>{name}</h1>
			{ingredients.map((item) => {
				return (
					<Link
						key={item._id}
						to={`/ingredients/${item._id}`}
						state={{ backgroundLocation: location }}>
						<Ingredient item={item} count={counters[item._id]} />
					</Link>
				);
			})}
		</div>
	);
};

export default BurgerSection;
