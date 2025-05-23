import { createSelector, createSlice } from '@reduxjs/toolkit';
import { loadIngredients } from './actions';

const initialState = {
	ingredients: [],
	loading: false,
	error: null,
	currentItem: null,
};
export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		setCurrentItem: (state, action) => {
			state.currentItem = action.payload;
		},
		revokeCurrentItem: (state) => {
			state.currentItem = null;
		},
	},
	selectors: {
		getIngredientsLoading: (state) => state.loading,
		getIngredientsError: (state) => state.error,
		getAllIngredients: (state) => state.ingredients,
		getIngredientsByType: createSelector(
			(state) => ingredientsSlice.getSelectors().getAllIngredients(state),
			(ingredients) => Map.groupBy(ingredients, (ingr) => ingr.type)
		),
		getCurrentItem: (state) => state.currentItem,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredients.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loadIngredients.fulfilled, (state, action) => {
				state.ingredients = action.payload.data;
				state.loading = false;
				state.error = null;
			})
			.addCase(loadIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message;
			});
	},
});

export const {
	getIngredientsLoading,
	getIngredientsError,
	getAllIngredients,
	getIngredientsByType,
	getCurrentItem,
} = ingredientsSlice.selectors;

export const { setCurrentItem, revokeCurrentItem } = ingredientsSlice.actions;
