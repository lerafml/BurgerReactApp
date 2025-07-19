import React, { useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerSection from '@components/burger-ingredients/burger-section/burger-section';
import { useSelector } from '@/services/store';
import { getIngredientsByType } from '../../services/ingredients/reducer';

export const BurgerIngredients = (): React.JSX.Element => {
	const ingredients = useSelector(getIngredientsByType);
	const [activeTab, setActiveTab] = useState({
		bun: true,
		main: false,
		sauce: false,
	});
	const navRef = useRef<HTMLElement | null>(null);
	const bunsRef = useRef<HTMLElement | null>(null);
	const mainsRef = useRef<HTMLElement | null>(null);
	const saucesRef = useRef<HTMLElement | null>(null);

	const handleScroll = () => {
		if (
			!navRef.current ||
			!bunsRef.current ||
			!mainsRef.current ||
			!saucesRef.current
		) {
			return;
		}

		const navY = navRef.current.getBoundingClientRect().bottom;
		const bunsY = Math.abs(bunsRef.current.getBoundingClientRect().top - navY);
		const mainsY = Math.abs(
			mainsRef.current.getBoundingClientRect().top - navY
		);
		const saucesY = Math.abs(
			saucesRef.current.getBoundingClientRect().top - navY
		);

		if (bunsY < mainsY && bunsY < saucesY) {
			setActiveTab({
				bun: true,
				main: false,
				sauce: false,
			});
		} else if (mainsY < bunsY && mainsY < saucesY) {
			setActiveTab({
				bun: false,
				main: true,
				sauce: false,
			});
		} else {
			setActiveTab({
				bun: false,
				main: false,
				sauce: true,
			});
		}
	};

	return (
		<section className={styles.burger_ingredients}>
			<nav ref={navRef}>
				<ul className={styles.menu}>
					<Tab value='bun' active={activeTab['bun']} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='main' active={activeTab['main']} onClick={() => {}}>
						Начинки
					</Tab>
					<Tab value='sauce' active={activeTab['sauce']} onClick={() => {}}>
						Соусы
					</Tab>
				</ul>
			</nav>
			<div
				className={`${styles.sections} custom-scroll`}
				onScroll={handleScroll}>
				<section ref={bunsRef}>
					<BurgerSection name='Булки' ingredients={ingredients.get('bun')} />
				</section>
				<section ref={mainsRef}>
					<BurgerSection name='Начинки' ingredients={ingredients.get('main')} />
				</section>
				<section ref={saucesRef}>
					<BurgerSection name='Соусы' ingredients={ingredients.get('sauce')} />
				</section>
			</div>
		</section>
	);
};
