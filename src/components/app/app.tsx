import React, { useEffect } from 'react';
import { AppHeader } from '@/components/app-header/app-header.js';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home } from '../../pages/home/home';
import { Login } from '../../pages/login/login';
import { Register } from '../../pages/register/register';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import IngredientDetails from '@/components/burger-ingredients/ingredient-details/ingredient-details';
import Modal from '@/components/modal/modal.js';
import { loadIngredients } from '../../services/ingredients/actions';
import { Preloader } from '@/components/preloader/preloader.js';
import {
	getAllIngredients,
	getIngredientsError,
	getIngredientsLoading,
} from '../../services/ingredients/reducer';
import { Profile } from '../../pages/profile/profile';
import { checkUserAuth } from '../../services/user/actions';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { ProfileEditor } from '../profile-editor/profile-editor';
import { Orders } from '../orders/order';
import { useDispatch, useSelector } from '@/services/store';
import { Feed } from '@/pages/feed/feed';
import { OrderInfo } from '../feed/order-info/order-info';

export const App = (): React.JSX.Element => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loading = useSelector(getIngredientsLoading);
	const error = useSelector(getIngredientsError);
	const ingredients = useSelector(getAllIngredients);
	const background = location.state && location.state.backgroundLocation;

	useEffect(() => {
		dispatch(checkUserAuth());
		dispatch(loadIngredients());
	}, [dispatch]);

	return (
		<>
			{error && 'Ошибка чтения данных!'}
			{loading && <Preloader />}
			{!loading && ingredients.length > 0 && (
				<div className={styles.app}>
					{background && (
						<Routes>
							<Route
								path='/ingredients/:id'
								element={
									<Modal name='Детали ингредиента' onClose={() => navigate(-1)}>
										<IngredientDetails />
									</Modal>
								}
							/>
							<Route
								path='/feed/:number'
								element={
									<Modal name='' onClose={() => navigate(-1)}>
										<OrderInfo />
									</Modal>
								}
							/>
							<Route
								path='/profile/orders/:number'
								element={
									<Modal name='' onClose={() => navigate(-1)}>
										<OrderInfo />
									</Modal>
								}
							/>
						</Routes>
					)}
					<Routes location={background || location}>
						<Route path='/' element={<AppHeader />}>
							<Route index element={<Home />} />
							<Route
								path='/ingredients/:id'
								element={
									<div
										className={`${styles.details} text text_type_main-medium`}>
										<h1>Детали ингредиента</h1>
										<IngredientDetails />
									</div>
								}
							/>
							<Route
								path='/login'
								element={<OnlyUnAuth component={<Login />} />}
							/>
							<Route
								path='/register'
								element={<OnlyUnAuth component={<Register />} />}
							/>
							<Route
								path='/forgot-password'
								element={<OnlyUnAuth component={<ForgotPassword />} />}
							/>
							<Route
								path='/reset-password'
								element={<OnlyUnAuth component={<ResetPassword />} />}
							/>
							<Route
								path='/profile'
								element={<OnlyAuth component={<Profile />} />}>
								<Route
									index
									element={<OnlyAuth component={<ProfileEditor />} />}
								/>
								<Route
									path='orders'
									element={<OnlyAuth component={<Orders />} />}
								/>
								<Route
									path='*'
									element={
										<p className='text text_type_main-large'>404 Not Found</p>
									}
								/>
							</Route>
							<Route path='/feed' element={<Feed />} />
							<Route
								path='/feed/:number'
								element={
									<div
										className={`${styles.details} text text_type_main-medium`}>
										<OrderInfo />
									</div>
								}
							/>
							<Route
								path='/profile/orders/:number'
								element={
									<div
										className={`${styles.details} text text_type_main-medium`}>
										<OrderInfo />
									</div>
								}
							/>
						</Route>
						<Route
							path='*'
							element={
								<p className='text text_type_main-large'>404 Not Found</p>
							}
						/>
					</Routes>
				</div>
			)}
		</>
	);
};
