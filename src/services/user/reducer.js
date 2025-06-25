import { createSlice } from '@reduxjs/toolkit';
import { authUser, logout, register, updateUserData } from './actions';

const initialState = {
	user: null,
	isAuthChecked: false,
	error: null,
};
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload.user;
		},
		setIsAuthChecked: (state, action) => {
			state.isAuthChecked = action.payload;
		},
	},
	selectors: {
		getUser: (state) => state.user,
		getIsAuthChecked: (state) => state.isAuthChecked,
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload.user;
			})
			.addCase(authUser.pending, (state) => {
				state.user = null;
				state.error = null;
			})
			.addCase(authUser.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.isAuthChecked = true;
			})
			.addCase(authUser.rejected, (state, action) => {
				state.user = null;
				state.error = action.error?.message;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.error = action.error?.message;
			})
			.addCase(updateUserData.fulfilled, (state, action) => {
				console.log(action.payload);
				state.user = action.payload.user;
			});
	},
});

export const { getUser, getIsAuthChecked } = userSlice.selectors;
export const { setUser, setIsAuthChecked } = userSlice.actions;
