import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';
import { makeOrder } from '../constructor/actions';

const initialState = {
	bun: null,
	ingredients: [],
	order: null,
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
		removeIngredient: (state, action) => {
			state.ingredients = state.ingredients.filter(
				(i) => i.key !== action.payload
			);
		},
		moveIngredient: (state, action) => {
			const draggable = state.ingredients[action.payload[0]];
			const newIngredients = [...state.ingredients];
			newIngredients.splice(action.payload[0], 1);
			newIngredients.splice(action.payload[1], 0, draggable);
			state.ingredients = newIngredients;
		},
		exitOrder: (state) => {
			state.order = null;
		},
	},
	selectors: {
		getOrder: (state) => state.order,
		getBun: (state) => state.bun,
		getConstructorIngredients: (state) => state.ingredients,
		getTotalPrice: createSelector(
			[
				(state) => constructorSlice.getSelectors().getBun(state),
				(state) =>
					constructorSlice.getSelectors().getConstructorIngredients(state),
			],
			(bun, ingredients) =>
				(bun?.price ?? 0) * 2 +
				(ingredients
					?.map((i) => i.item.price)
					.reduce((sum, val) => sum + val, 0) ?? 0)
		),
	},
	extraReducers: (builder) => {
		builder
			.addCase(makeOrder.pending, (state) => {
				state.order = null;
				state.error = null;
			})
			.addCase(makeOrder.fulfilled, (state, action) => {
				state.order = action.payload.order.number;
				state.error = null;
			})
			.addCase(makeOrder.rejected, (state, action) => {
				state.order = null;
				state.error = action.error?.message;
			});
	},
});

export const {
	addIngredient,
	submitOrder,
	exitOrder,
	moveIngredient,
	removeIngredient,
} = constructorSlice.actions;
export const { getOrder, getBun, getConstructorIngredients, getTotalPrice } =
	constructorSlice.selectors;
