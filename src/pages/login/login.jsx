import React, { useState } from 'react';
import styles from './login.module.css';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authUser } from '../../services/user/actions';

export const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [psw, setPassword] = useState('');

	const handleLoginClick = () => {
		dispatch(authUser({ email: email, password: psw }));
	};

	return (
		<div className={styles.wrapper}>
			<p className='text text_type_main-medium'>Вход</p>
			<EmailInput
				name={'email'}
				isIcon={false}
				extraClass='mt-6'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<PasswordInput
				name={'password'}
				extraClass='mt-6'
				value={psw}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button
				htmlType='button'
				type='primary'
				size='large'
				extraClass='mt-6'
				onClick={handleLoginClick}>
				Войти
			</Button>
			<section className={`${styles.section} mt-20`}>
				<p className='text text_type_main-default text_color_inactive pr-4'>
					Вы - новый пользователь?
				</p>
				<Button
					htmlType='button'
					type='secondary'
					size='medium'
					extraClass={styles.btn}
					onClick={() => navigate('/register', { replace: true })}>
					Зарегистрироваться
				</Button>
			</section>
			<section className={`${styles.section} mt-4`}>
				<p className='text text_type_main-default text_color_inactive pr-4'>
					Забыли пароль?
				</p>
				<Button
					htmlType='button'
					type='secondary'
					size='medium'
					extraClass={styles.btn}
					onClick={() => navigate('/forgot-password', { replace: true })}>
					Восстановить пароль
				</Button>
			</section>
		</div>
	);
};
