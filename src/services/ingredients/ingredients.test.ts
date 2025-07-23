import { expect } from 'vitest';
import { ingredientsSlice, initialState } from './reducer';
import { loadIngredients } from './actions';
import { IGetIngredientsData } from '@/utils/types';

const ingredients: IGetIngredientsData = {
	success: true,
	data: [
		{
			_id: '60666c42cc7b410027a1a9b5',
			name: 'Говяжий метеорит (отбивная)',
			type: 'main',
			proteins: 800,
			fat: 800,
			carbohydrates: 300,
			calories: 2674,
			price: 3000,
			image: 'https://code.s3.yandex.net/react/code/meat-04.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
			__v: 0,
		},
		{
			_id: '60666c42cc7b410027a1a9b6',
			name: 'Биокотлета из марсианской Магнолии',
			type: 'main',
			proteins: 420,
			fat: 142,
			carbohydrates: 242,
			calories: 4242,
			price: 424,
			image: 'https://code.s3.yandex.net/react/code/meat-01.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
			__v: 0,
		},
	],
};

describe('ingredients reducer', () => {
	it('initializes correctly', () => {
		const state = ingredientsSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('loadIngredients fullfilled', () => {
		const action = {
			type: loadIngredients.fulfilled.type,
			payload: ingredients,
		};
		const state = ingredientsSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			ingredients: ingredients.data,
			loading: false,
			error: null,
		});
	});

	it('loadIngredients pending', () => {
		const action = { type: loadIngredients.pending.type };
		const state = ingredientsSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('loadIngredients rejected', () => {
		const action = {
			type: loadIngredients.rejected.type,
			error: { message: 'test' },
		};
		const state = ingredientsSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			error: 'test',
			loading: false,
		});
	});
});
