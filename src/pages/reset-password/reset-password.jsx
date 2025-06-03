import React from 'react';
import styles from './reset-password.module.css';
import {
	PasswordInput,
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const ResetPassword = () => {
	return (
		<div className={styles.wrapper}>
			<p className='text text_type_main-medium'>Восстановление пароля</p>
			<PasswordInput
				placeholder='Введите новый пароль'
				name={'password'}
				extraClass='mt-4'
			/>
			<Input
				type={'text'}
				placeholder={'Введите код из письма'}
				name={'code'}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
				extraClass='mt-4'
			/>
			<Button htmlType='button' type='primary' size='large' extraClass='mt-6'>
				Сохранить
			</Button>
			<section className={`${styles.section} mt-20`}>
				<p className='text text_type_main-default text_color_inactive pr-4'>
					Вспомнили пароль?
				</p>
				<Button
					htmlType='button'
					type='secondary'
					size='medium'
					extraClass={styles.btn}>
					Войти
				</Button>
			</section>
		</div>
	);
};
