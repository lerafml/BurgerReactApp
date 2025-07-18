import { IGetFeedData } from '@/utils/types';
import { createAction } from '@reduxjs/toolkit';

export const profileConnect = createAction<string, 'profile/orders/connect'>(
	'profile/orders/connect'
);
export const profileDisconnect = createAction('profile/orders/disconnect');

export const profileOnError = createAction<string, 'profile/orders/onerror'>(
	'profile/orders/onerror'
);
export const profileOnMessage = createAction<
	IGetFeedData,
	'profile/orders/onmessage'
>('profile/orders/onmessage');

export type ProfileActions =
	| ReturnType<typeof profileConnect>
	| ReturnType<typeof profileDisconnect>
	| ReturnType<typeof profileOnError>
	| ReturnType<typeof profileOnMessage>;
