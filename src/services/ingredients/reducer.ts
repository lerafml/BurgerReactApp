import { createSelector, createSlice } from '@reduxjs/toolkit';
import { loadIngredients } from './actions';
import { IIngredient } from '@/utils/types';

interface IIngredientsState {
	ingredients: IIngredient[];
	loading: boolean;
	error: string | null;
	currentItem: IIngredient | null;
}

export const initialState: IIngredientsState = {
	ingredients: [],
	loading: false,
	error: null,
	currentItem: null,
};
export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	selectors: {
		getIngredientsLoading: (state) => state.loading,
		getIngredientsError: (state) => state.error,
		getAllIngredients: (state) => state.ingredients,
		getIngredientsByType: createSelector(
			(state: IIngredientsState) => state.ingredients,
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
				state.error = action.error?.message ?? 'Ошибка';
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
