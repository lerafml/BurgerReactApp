import React from 'react';
import styles from './profile.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import { logout } from '../../services/user/actions';
import { useDispatch } from 'react-redux';

export const Profile = () => {
	const dispatch = useDispatch();

	return (
		<div className={styles.wrapper}>
			<section className={`${styles.tab} text text_type_main-medium`}>
				<NavLink
					to='/profile'
					end
					className={({ isActive }) =>
						isActive
							? 'text text_type_main-medium p-2'
							: 'text text_type_main-medium text_color_inactive p-2'
					}>
					Профиль
				</NavLink>
				<NavLink
					to='/profile/orders'
					className={({ isActive }) =>
						isActive
							? 'text text_type_main-medium p-2'
							: 'text text_type_main-medium text_color_inactive p-2'
					}>
					История заказов
				</NavLink>
				<button
					className={`${styles.btn} text text_type_main-medium text_color_inactive p-2`}
					onClick={() => dispatch(logout())}>
					Выход
				</button>
				<p className='text text_type_main-default text_color_inactive mt-20'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</section>
			<section>
				<Outlet />
			</section>
		</div>
	);
};
