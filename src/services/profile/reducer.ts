import { IOrderDetails } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { profileOnError, profileOnMessage } from './actions';

export interface IProfileState {
	orders: IOrderDetails[];
	total: number;
	totalToday: number;
	error: string | null;
}

export const initialState: IProfileState = {
	orders: [],
	total: 0,
	totalToday: 0,
	error: null,
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	selectors: {
		getProfileError: (state) => state.error,
		getProfileOrders: (state) => state.orders,
		getProfileOrdersTotal: (state) => state.total,
		getProfileOrdersTotalToday: (state) => state.totalToday,
	},
	extraReducers: (builder) => {
		builder
			.addCase(profileOnError, (state, action) => {
				state.error = action.payload;
			})
			.addCase(profileOnMessage, (state, action) => {
				state.orders = action.payload.orders;
				state.total = action.payload.total;
				state.totalToday = action.payload.totalToday;
			});
	},
});

export const {
	getProfileError,
	getProfileOrders,
	getProfileOrdersTotal,
	getProfileOrdersTotalToday,
} = profileSlice.selectors;
