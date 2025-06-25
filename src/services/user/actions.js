import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	authorizeUser,
	getUser,
	registerUser,
	logoutUser,
	updateUser,
} from '../../utils/api';
import { setIsAuthChecked, setUser } from './reducer';

export const register = createAsyncThunk('user/register', registerUser);

export const authUser = createAsyncThunk('user/auth', authorizeUser);

export const logout = createAsyncThunk('user/logout', logoutUser);

export const updateUserData = createAsyncThunk('user/update', updateUser);

export const checkUserAuth = createAsyncThunk(
	'user/checkUserAuth',
	async (_, { dispatch }) => {
		if (localStorage.getItem('accessToken')) {
			getUser()
				.then((res) => {
					dispatch(setUser(res));
				})
				.finally(() => dispatch(setIsAuthChecked(true)));
		} else {
			dispatch(setIsAuthChecked(true));
		}
	}
);
