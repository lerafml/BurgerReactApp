import { expect } from 'vitest';
import { userSlice, initialState, setUser, setIsAuthChecked } from './reducer';
import { authUser, logout, register, updateUserData } from './actions';
import { IGetUserData, IRegisterData } from '@/utils/types';

const userRegister: IRegisterData = {
	success: true,
	user: {
		name: 'user',
		email: 'user@gmail.com',
	},
	accessToken: 'accessToken',
	refreshToken: 'refreshToken',
};
const userGetData: IGetUserData = {
	success: true,
	user: {
		name: 'user',
		email: 'user@gmail.com',
	},
};

describe('user reducer', () => {
	it('initializes correctly', () => {
		const state = userSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('authUser pending', () => {
		const action = {
			type: authUser.pending.type,
		};
		const state = userSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			user: null,
			error: null,
		});
	});

	it('authUser fullfilled', () => {
		const action = {
			type: authUser.fulfilled.type,
			payload: userRegister,
		};
		const state = userSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			user: userRegister.user,
			isAuthChecked: true,
		});
	});

	it('authUser rejected', () => {
		const action = {
			type: authUser.rejected.type,
			error: { message: 'error' },
		};
		const state = userSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			user: null,
			error: 'error',
		});
	});

	it('register fullfilled', () => {
		const action = {
			type: register.fulfilled.type,
			payload: userRegister,
		};
		const state = userSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			user: userRegister.user,
		});
	});

	it('logout fullfilled', () => {
		const action = {
			type: logout.fulfilled.type,
		};
		const state = userSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			user: null,
		});
	});

	it('logout rejected', () => {
		const action = {
			type: logout.rejected.type,
			error: { message: 'error' },
		};
		const state = userSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			error: 'error',
		});
	});

	it('update fullfilled', () => {
		const action = {
			type: updateUserData.fulfilled.type,
			payload: userGetData,
		};
		const state = userSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			user: userGetData.user,
		});
	});

	it('setUser', () => {
		const action = {
			type: setUser.type,
			payload: userGetData,
		};
		const state = userSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			user: userGetData.user,
		});
	});

	it('setIsAuthChecked', () => {
		const action = {
			type: setIsAuthChecked.type,
			payload: true,
		};
		const state = userSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			isAuthChecked: true,
		});
	});
});
