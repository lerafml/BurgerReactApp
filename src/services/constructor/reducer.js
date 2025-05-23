import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	orderSubmitted: false,
};
export const constructorSlice = createSlice({
	name: 'ingredientsConstructor',
	initialState,
	reducers: {
		submitOrder: (state) => {
			state.orderSubmitted = true;
		},
		exitOrder: (state) => {
			state.orderSubmitted = false;
		},
	},
	selectors: {
		getOrderSubmitted: (state) => state.orderSubmitted,
	},
});

export const { submitOrder, exitOrder } = constructorSlice.actions;
export const { getOrderSubmitted } = constructorSlice.selectors;
