import { IGetFeedData } from '@/utils/types';
import { createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'feed/connect'>('feed/connect');
export const wsDisconnect = createAction('feed/disconnect');

export const onError = createAction<string, 'feed/onerror'>('feed/onerror');
export const onMessage = createAction<IGetFeedData, 'feed/onmessage'>(
	'feed/onmessage'
);

export type FeedActions =
	| ReturnType<typeof wsConnect>
	| ReturnType<typeof wsDisconnect>
	| ReturnType<typeof onError>
	| ReturnType<typeof onMessage>;
