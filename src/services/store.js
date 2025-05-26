import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients/reducer';
import { constructorSlice } from './constructor/reducer';

const rootReducer = combineSlices(ingredientsSlice, constructorSlice);

export const configStore = (initialState) => {
	return configureStore({
		reducer: rootReducer,
		//devTools: process.env.NODE_ENV !== 'production',
		preloadedState: initialState,
	});
};
