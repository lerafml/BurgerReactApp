import {
	combineSlices,
	configureStore,
	ThunkAction,
	ThunkDispatch,
} from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients/reducer';
import { ConstructorActions, constructorSlice } from './constructor/reducer';
import { UserActions, userSlice } from './user/reducer';
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
import {
	ProfileActions,
	profileConnect,
	profileDisconnect,
	profileOnError,
	profileOnMessage,
} from './profile/actions';
import { profileSlice } from './profile/reducer';

const rootReducer = combineSlices(
	ingredientsSlice,
	constructorSlice,
	userSlice,
	feedSlice,
	profileSlice
);

const feedMiddleware = socketMiddleware({
	connect: wsConnect,
	disconnect: wsDisconnect,
	onError,
	onMessage,
});

const profileMiddleware = socketMiddleware({
	connect: profileConnect,
	disconnect: profileDisconnect,
	onError: profileOnError,
	onMessage: profileOnMessage,
});

export const configStore = (initialState: RootState) => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware().concat(feedMiddleware, profileMiddleware);
		},
		//devTools: process.env.NODE_ENV !== 'production',
		preloadedState: initialState,
	});
};

export type AppActions =
	| FeedActions
	| ProfileActions
	| ConstructorActions
	| UserActions;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AppActions
>;
type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
