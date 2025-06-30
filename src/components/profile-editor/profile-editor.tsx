import React, { useState } from 'react';
import styles from './profile-editor.module.css';
import {
	EmailInput,
	PasswordInput,
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser } from '../../services/user/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../services/user/actions';
import { IUser } from '@/utils/types';

export const ProfileEditor = (): React.JSX.Element => {
	const user: IUser = useSelector(getUser);
	const dispatch = useDispatch();
	const [userName, setUserName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [psw, setPassword] = useState('');
	const [isEdited, setIsEdited] = useState(false);

	const onCancelClick = () => {
		setUserName(user.name);
		setEmail(user.email);
		setPassword('');
		setIsEdited(false);
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateUserData({ email: email, password: psw, name: userName }));
	};

	return (
		<form onSubmit={onSubmit}>
			<Input
				type={'text'}
				placeholder={'Имя'}
				name={'name'}
				value={userName}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
				icon='EditIcon'
				extraClass='mt-4'
				onChange={(e) => {
					setUserName(e.target.value);
					setIsEdited(true);
				}}
			/>
			<EmailInput
				name={'email'}
				value={email}
				isIcon={true}
				extraClass='mt-6'
				onChange={(e) => {
					setEmail(e.target.value);
					setIsEdited(true);
				}}
			/>
			<PasswordInput
				name={'password'}
				value={psw}
				icon='EditIcon'
				extraClass='mt-6'
				onChange={(e) => {
					setPassword(e.target.value);
					setIsEdited(true);
				}}
			/>
			{isEdited && (
				<div className={styles.bottom}>
					<Button
						htmlType='button'
						type='secondary'
						size='large'
						extraClass='mt-6'
						onClick={onCancelClick}>
						Отмена
					</Button>
					<Button
						htmlType='submit'
						type='primary'
						size='large'
						extraClass='mt-6'>
						Сохранить
					</Button>
				</div>
			)}
		</form>
	);
};
