import { describe, expect, it } from 'vitest';
import {
	addIngredient,
	constructorSlice,
	exitOrder,
	initialState,
	moveIngredient,
	removeIngredient,
} from './reducer';
import { makeOrder } from './actions';
import { ConstructorIngredient, IOrder } from '@/utils/types';

const order: IOrder = {
	success: true,
	name: 'test',
	order: {
		number: 837428,
	},
};
const bun: ConstructorIngredient = {
	item: {
		_id: '60666c42cc7b410027a1a9b1',
		name: 'Краторная булка N-200i',
		type: 'bun',
		proteins: 80,
		fat: 24,
		carbohydrates: 53,
		calories: 420,
		price: 1255,
		image: 'https://code.s3.yandex.net/react/code/bun-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
		__v: 0,
	},
	key: '001',
};
const ingredient: ConstructorIngredient = {
	item: {
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
	key: '002',
};
const ingredient2: ConstructorIngredient = {
	item: {
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
	key: '003',
};

describe('ingredientsConstructor reducer', () => {
	it('initializes correctly', () => {
		const state = constructorSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('makeOrder fullfilled', () => {
		const action = { type: makeOrder.fulfilled.type, payload: order };
		const state = constructorSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			order: order.order.number,
			error: null,
			orderPending: false,
		});
	});

	it('makeOrder pending', () => {
		const action = { type: makeOrder.pending.type };
		const state = constructorSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			order: null,
			error: null,
			orderPending: true,
		});
	});

	it('makeOrder rejected', () => {
		const action = {
			type: makeOrder.rejected.type,
			error: { message: 'test' },
		};
		const state = constructorSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			order: null,
			error: 'test',
			orderPending: false,
		});
	});

	it('addIngredient', () => {
		const action = {
			type: addIngredient.type,
			payload: bun,
		};
		const state = constructorSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			bun: bun.item,
		});
	});

	it('removeIngredient', () => {
		const prevState = { ...initialState, ingredients: [ingredient] };
		const action = {
			type: removeIngredient.type,
			payload: ingredient.key,
		};
		const state = constructorSlice.reducer(prevState, action);
		expect(state).toEqual(initialState);
	});

	it('moveIngredient', () => {
		const prevState = {
			...initialState,
			ingredients: [ingredient, ingredient2],
		};
		const action = {
			type: moveIngredient.type,
			payload: [0, 1],
		};
		const state = constructorSlice.reducer(prevState, action);
		expect(state).toEqual({
			...prevState,
			ingredients: [ingredient2, ingredient],
		});
	});

	it('exitOrder', () => {
		const action = { type: exitOrder.type };
		const state = constructorSlice.reducer(initialState, action);
		expect(state).toEqual({ ...initialState, order: null });
	});
});
