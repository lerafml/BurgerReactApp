import React, { useState } from 'react';
import styles from './register.module.css';
import {
	EmailInput,
	PasswordInput,
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../services/user/actions';

export const Register = (): React.JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [psw, setPassword] = useState('');

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(register({ email: email, password: psw, name: userName }));
	};

	return (
		<div className={styles.wrapper}>
			<p className='text text_type_main-medium'>Регистрация</p>
			<form onSubmit={onSubmit} className={styles.form}>
				<Input
					value={userName}
					type={'text'}
					placeholder={'Имя'}
					name={'name'}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					onChange={(e) => setUserName(e.target.value)}
					extraClass='mt-4'
				/>
				<EmailInput
					name={'email'}
					value={email}
					isIcon={false}
					extraClass='mt-6'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<PasswordInput
					name={'password'}
					value={psw}
					extraClass='mt-6'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button htmlType='submit' type='primary' size='large' extraClass='mt-6'>
					Зарегистрироваться
				</Button>
			</form>
			<section className={`${styles.section} mt-20`}>
				<p className='text text_type_main-default text_color_inactive pr-4'>
					Уже зарегистрированы?
				</p>
				<Button
					htmlType='button'
					type='secondary'
					size='medium'
					extraClass={styles.btn}
					onClick={() => navigate('/login', { replace: true })}>
					Войти
				</Button>
			</section>
		</div>
	);
};
