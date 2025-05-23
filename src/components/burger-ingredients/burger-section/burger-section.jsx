import styles from './burger-section.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import Ingredient from '@components/burger-ingredients/ingredient/ingredient';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentItem } from '../../../services/ingredients/reducer';
import {
	getBun,
	getConstructorIngredients,
} from '../../../services/constructor/reducer';

const BurgerSection = ({ name, ingredients }) => {
	const dispatch = useDispatch();
	const constructorBun = useSelector(getBun);
	const constructorIngredients = useSelector(getConstructorIngredients);
	let counters = {};
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
					<Ingredient
						key={item._id}
						item={item}
						count={counters[item._id]}
						onClick={() => dispatch(setCurrentItem(item))}
					/>
				);
			})}
		</div>
	);
};

BurgerSection.propTypes = {
	name: PropTypes.string.isRequired,
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerSection;
