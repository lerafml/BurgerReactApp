import React, { useState } from 'react';
import styles from './forgot-password.module.css';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../utils/api';

export const ForgotPassword = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');

	const onSubmitHandler = () => {
		resetPassword(email).then(() => {
			localStorage.setItem('reset', true);
			navigate('/reset-password', { replace: true });
		});
	};

	return (
		<div className={styles.wrapper}>
			<p className='text text_type_main-medium'>Восстановление пароля</p>
			<EmailInput
				placeholder='Укажите e-mail'
				name={'email'}
				value={email}
				isIcon={false}
				extraClass='mt-6'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Button
				htmlType='button'
				type='primary'
				size='large'
				extraClass='mt-6'
				onClick={onSubmitHandler}>
				Восстановить
			</Button>
			<section className={`${styles.section} mt-20`}>
				<p className='text text_type_main-default text_color_inactive pr-4'>
					Вспомнили пароль?
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
