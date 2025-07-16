import { combineSlices, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients/reducer';
import { constructorSlice } from './constructor/reducer';
import { userSlice } from './user/reducer';
import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';
import { feedSlice } from './feed/reducer';
import { socketMiddleware } from './middleware';
import {
	FeedActions,
	onError,
	onMessage,
	wsConnect,
	wsDisconnect,
} from './feed/actions';

const rootReducer = combineSlices(
	ingredientsSlice,
	constructorSlice,
	userSlice,
	feedSlice
);

const feedMiddleware = socketMiddleware({
	connect: wsConnect,
	disconnect: wsDisconnect,
	onError,
	onMessage,
});

export const configStore = (initialState: RootState) => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware().concat(feedMiddleware);
		},
		//devTools: process.env.NODE_ENV !== 'production',
		preloadedState: initialState,
	});
};

export type AppActions = FeedActions;
export type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
