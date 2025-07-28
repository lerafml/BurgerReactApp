import { describe, expect, it } from 'vitest';
import { feedSlice, initialState } from './reducer';
import { loadOrder, onError, onMessage } from './actions';
import { IGetFeedData, IGetOrderData } from '@/utils/types';

const orders: IGetFeedData = {
	success: true,
	orders: [
		{
			ingredients: ['60d3463f7034a000269f45e9', '60d3463f7034a000269f45e7'],
			name: 'one',
			_id: '',
			status: 'done',
			number: 1,
			createdAt: '2021-06-23T20:11:01.403Z',
			updatedAt: '2021-06-23T20:11:01.406Z',
		},
		{
			ingredients: ['60d3463f7034a000269f45e9'],
			name: 'two',
			_id: '',
			status: 'done',
			number: 3,
			createdAt: '2021-06-23T20:13:23.654Z',
			updatedAt: '2021-06-23T20:13:23.657Z',
		},
	],
	total: 2,
	totalToday: 2,
};
const myOrders: IGetOrderData = {
	success: true,
	orders: [
		{
			ingredients: ['60d3463f7034a000269f45e9', '60d3463f7034a000269f45e7'],
			name: 'one',
			_id: '',
			status: 'done',
			number: 1,
			createdAt: '2021-06-23T20:11:01.403Z',
			updatedAt: '2021-06-23T20:11:01.406Z',
		},
		{
			ingredients: ['60d3463f7034a000269f45e9'],
			name: 'two',
			_id: '',
			status: 'done',
			number: 3,
			createdAt: '2021-06-23T20:13:23.654Z',
			updatedAt: '2021-06-23T20:13:23.657Z',
		},
	],
};

describe('feed reducer', () => {
	it('initializes correctly', () => {
		const state = feedSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('onError', () => {
		const action = { type: onError.type, payload: 'error' };
		const state = feedSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			error: 'error',
		});
	});

	it('onMessage', () => {
		const action = { type: onMessage.type, payload: orders };
		const state = feedSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			orders: orders.orders,
			total: orders.total,
			totalToday: orders.totalToday,
		});
	});

	it('loadOrder fullfilled', () => {
		const action = {
			type: loadOrder.fulfilled.type,
			payload: myOrders,
		};
		const state = feedSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			order: myOrders.orders[0],
		});
	});
});
