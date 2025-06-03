import React from 'react';
import styles from './login.module.css';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const Login = () => {
	return (
		<div className={styles.wrapper}>
			<p className='text text_type_main-medium'>Вход</p>
			<EmailInput name={'email'} isIcon={false} extraClass='mt-6' />
			<PasswordInput name={'password'} extraClass='mt-6' />
			<Button htmlType='button' type='primary' size='large' extraClass='mt-6'>
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
					extraClass={styles.btn}>
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
					extraClass={styles.btn}>
					Восстановить пароль
				</Button>
			</section>
		</div>
	);
};
