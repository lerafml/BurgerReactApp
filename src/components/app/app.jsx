import React from 'react';
import { AppHeader } from '@components/app-header/app-header.jsx';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../../../src/pages/home/home';
import { Login } from '../../../src/pages/login/login';
import { Register } from '../../../src/pages/register/register';
import { ForgotPassword } from '../../../src/pages/forgot-password/forgot-password';
import { ResetPassword } from '../../../src/pages/reset-password/reset-password';

export const App = () => {
	return (
		<div className={styles.app}>
			<AppHeader />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/forgotpassword' element={<ForgotPassword />} />
				<Route path='/resetpassword' element={<ResetPassword />} />
			</Routes>
		</div>
	);
};
