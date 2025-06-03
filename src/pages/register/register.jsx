import React from 'react';
import styles from './register.module.css';
import {
	EmailInput,
	PasswordInput,
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const Register = () => {
	return (
		<div className={styles.wrapper}>
			<p className='text text_type_main-medium'>Регистрация</p>
			<Input
				type={'text'}
				placeholder={'Имя'}
				name={'name'}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
				extraClass='mt-4'
			/>
			<EmailInput name={'email'} isIcon={false} extraClass='mt-6' />
			<PasswordInput name={'password'} extraClass='mt-6' />
			<Button htmlType='button' type='primary' size='large' extraClass='mt-6'>
				Зарегистрироваться
			</Button>
			<section className={`${styles.section} mt-20`}>
				<p className='text text_type_main-default text_color_inactive pr-4'>
					Уже зарегистрированы?
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
