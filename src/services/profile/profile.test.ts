import { expect } from 'vitest';
import { profileSlice, initialState } from './reducer';
import { profileOnError, profileOnMessage } from './actions';
import { IGetFeedData } from '@/utils/types';

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

describe('profile reducer', () => {
	it('initializes correctly', () => {
		const state = profileSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('onError', () => {
		const action = { type: profileOnError.type, payload: 'error' };
		const state = profileSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			error: 'error',
		});
	});

	it('onMessage', () => {
		const action = { type: profileOnMessage.type, payload: orders };
		const state = profileSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			orders: orders.orders,
			total: orders.total,
			totalToday: orders.totalToday,
		});
	});
});
