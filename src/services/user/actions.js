import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	authorizeUser,
	getUser,
	registerUser,
	logoutUser,
	updateUser,
} from '../../utils/api';
import { setIsAuthChecked, setUser } from './reducer';

export const register = createAsyncThunk('user/register', async (data) => {
	return registerUser(data);
});

export const authUser = createAsyncThunk('user/auth', async (data) => {
	return authorizeUser(data);
});

export const logout = createAsyncThunk('user/logout', async () => {
	return logoutUser();
});

export const updateUserData = createAsyncThunk('user/update', async (data) => {
	return updateUser(data);
});

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
