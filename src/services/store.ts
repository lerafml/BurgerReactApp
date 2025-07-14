import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients/reducer';
import { constructorSlice } from './constructor/reducer';
import { userSlice } from './user/reducer';
import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';

const rootReducer = combineSlices(
	ingredientsSlice,
	constructorSlice,
	userSlice
);

export const configStore = (initialState: RootState) => {
	return configureStore({
		reducer: rootReducer,
		//devTools: process.env.NODE_ENV !== 'production',
		preloadedState: initialState,
	});
};

type RootState = ReturnType<typeof rootReducer>;
type storeType = ReturnType<typeof configStore>;
type AppDispatch = storeType['dispatch'];
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
