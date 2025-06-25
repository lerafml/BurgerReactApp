import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients/reducer';
import { constructorSlice } from './constructor/reducer';
import { userSlice } from './user/reducer';

const rootReducer = combineSlices(
	ingredientsSlice,
	constructorSlice,
	userSlice
);

export const configStore = (initialState) => {
	return configureStore({
		reducer: rootReducer,
		//devTools: process.env.NODE_ENV !== 'production',
		preloadedState: initialState,
	});
};
