import { createSlice, nanoid } from '@reduxjs/toolkit';
import { makeOrder } from '../constructor/actions';

const initialState = {
	bun: null,
	ingredients: [],
	orderSubmitted: false,
	loading: false,
	error: false,
};
export const constructorSlice = createSlice({
	name: 'ingredientsConstructor',
	initialState,
	reducers: {
		addIngredient: {
			reducer: (state, action) => {
				if (action.payload.item.type == 'bun') {
					state.bun = action.payload.item;
				} else {
					const ingredient = action.payload;
					state.ingredients = [...state.ingredients, ingredient];
				}
			},
			prepare: (ingredient) => {
				return {
					payload: { ...ingredient, key: nanoid() },
				};
			},
		},
		submitOrder: (state) => {
			state.orderSubmitted = true;
		},
		exitOrder: (state) => {
			state.orderSubmitted = false;
		},
	},
	selectors: {
		getOrderSubmitted: (state) => state.orderSubmitted,
		getBun: (state) => state.bun,
		getConstructorIngredients: (state) => state.ingredients,
	},
	extraReducers: (builder) => {
		builder
			.addCase(makeOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(makeOrder.fulfilled, (state) => {
				state.orderSubmitted = true;
				state.loading = false;
				state.error = null;
			})
			.addCase(makeOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message;
			});
	},
});

export const { addIngredient, submitOrder, exitOrder } =
	constructorSlice.actions;
export const { getOrderSubmitted, getBun, getConstructorIngredients } =
	constructorSlice.selectors;
