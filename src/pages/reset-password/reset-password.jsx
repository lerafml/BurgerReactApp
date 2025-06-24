import React, { useEffect, useState } from 'react';
import styles from './reset-password.module.css';
import {
	PasswordInput,
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { resetPasswordConfirm } from '../../utils/api';

export const ResetPassword = () => {
	const navigate = useNavigate();
	const [psw, setPassword] = useState('');
	const [code, setCode] = useState('');

	useEffect(() => {
		if (!localStorage.getItem('reset')) {
			navigate('/forgot-password', { replace: true });
		}
	}, [navigate]);

	const onSubmit = (e) => {
		e.preventDefault();
		resetPasswordConfirm({ password: psw, token: code }).then(() => {
			localStorage.removeItem('reset');
			navigate('/login', { replace: true });
		});
	};

	return (
		<div className={styles.wrapper}>
			<p className='text text_type_main-medium'>Восстановление пароля</p>
			<form onSubmit={onSubmit} className={styles.form}>
				<PasswordInput
					placeholder='Введите новый пароль'
					name={'password'}
					value={psw}
					extraClass='mt-4'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					name={'code'}
					value={code}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass='mt-4'
					onChange={(e) => setCode(e.target.value)}
				/>
				<Button htmlType='submit' type='primary' size='large' extraClass='mt-6'>
					Сохранить
				</Button>
			</form>
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
