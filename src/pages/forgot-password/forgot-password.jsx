import React from 'react';
import styles from './forgot-password.module.css';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const ForgotPassword = () => {
	return (
		<div className={styles.wrapper}>
			<p className='text text_type_main-medium'>Восстановление пароля</p>
			<EmailInput
				placeholder='Укажите e-mail'
				name={'email'}
				isIcon={false}
				extraClass='mt-6'
			/>
			<Button htmlType='button' type='primary' size='large' extraClass='mt-6'>
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
					extraClass={styles.btn}>
					Войти
				</Button>
			</section>
		</div>
	);
};
