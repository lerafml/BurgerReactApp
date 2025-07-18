import { IOrderDetails } from '@/utils/types';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { loadOrder, onError, onMessage } from './actions';

export interface IFeedState {
	orders: IOrderDetails[];
	total: number;
	totalToday: number;
	error: string | null;
	order: IOrderDetails | null;
}

export const initialState: IFeedState = {
	orders: [],
	total: 0,
	totalToday: 0,
	error: null,
	order: null,
};

export const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {},
	selectors: {
		getError: (state) => state.error,
		getFeed: (state) => state.orders,
		getFeedTotal: (state) => state.total,
		getFeedTotalToday: (state) => state.totalToday,
		getFeedByStatus: createSelector(
			(state: IFeedState) => state.orders,
			(orders) => Map.groupBy(orders, (order) => order.status)
		),
	},
	extraReducers: (builder) => {
		builder
			.addCase(onError, (state, action) => {
				state.error = action.payload;
			})
			.addCase(onMessage, (state, action) => {
				state.orders = action.payload.orders;
				state.total = action.payload.total;
				state.totalToday = action.payload.totalToday;
			})
			.addCase(loadOrder.fulfilled, (state, action) => {
				state.order = action.payload.orders[0];
			});
	},
});

export const {
	getError,
	getFeed,
	getFeedTotal,
	getFeedTotalToday,
	getFeedByStatus,
} = feedSlice.selectors;
