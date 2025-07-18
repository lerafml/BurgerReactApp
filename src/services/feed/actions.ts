import { getOrder } from '@/utils/api';
import { IGetFeedData } from '@/utils/types';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'feed/connect'>('feed/connect');
export const wsDisconnect = createAction('feed/disconnect');

export const onError = createAction<string, 'feed/onerror'>('feed/onerror');
export const onMessage = createAction<IGetFeedData, 'feed/onmessage'>(
	'feed/onmessage'
);
export const loadOrder = createAsyncThunk('feed/getorder', getOrder);

export type FeedActions =
	| ReturnType<typeof wsConnect>
	| ReturnType<typeof wsDisconnect>
	| ReturnType<typeof onError>
	| ReturnType<typeof onMessage>;
