import { Middleware } from 'redux';
import { RootState } from './store';
import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import { refreshToken } from '@/utils/api';

interface IWSActions<R, S> {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	send?: ActionCreatorWithPayload<S>;
	onConnecting?: ActionCreatorWithoutPayload;
	onOpen?: ActionCreatorWithoutPayload;
	onClose?: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	onMessage: ActionCreatorWithPayload<R>;
}

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <A, B>(
	wsActions: IWSActions<A, B>,
	withTokenRefresh?: boolean = false
): Middleware<Record<string, never>, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const {
			connect,
			disconnect,
			send,
			onConnecting,
			onOpen,
			onClose,
			onError,
			onMessage,
		} = wsActions;
		const { dispatch } = store;
		let reconnectTimer: string | number | NodeJS.Timeout | undefined = 0;
		let connected = false;
		let url = '';

		return (next) => (action) => {
			if (connect.match(action)) {
				socket = new WebSocket(action.payload);
				onConnecting && dispatch(onConnecting());
				connected = true;
				url = action.payload;

				socket.onopen = () => {
					onOpen && dispatch(onOpen());
				};

				socket.onerror = () => {
					onError && dispatch(onError('Unknown error'));
				};

				socket.onclose = () => {
					onClose && dispatch(onClose());

					if (connected) {
						reconnectTimer = setTimeout(() => {
							dispatch(connect(url));
						}, RECONNECT_PERIOD);
					}
				};

				socket.onmessage = (event) => {
					try {
						const data = JSON.parse(event.data);

						if (withTokenRefresh && data.message === 'jwt expired') {
							refreshToken()
								.then((refreshData) => {
									const wssUrl = new URL(url);
									wssUrl.searchParams.set(
										'accessToken',
										refreshData.accessToken.replace('Bearer ', '')
									);
									dispatch(connect(wssUrl.toString()));
								})
								.catch((e) => {
									dispatch(onError((e as Error).message));
								});

							dispatch(disconnect());
							return;
						}

						dispatch(onMessage(data));
					} catch (e) {
						dispatch(onError((e as Error).message));
					}
				};

				return;
			}

			if (socket && send?.match(action)) {
				try {
					socket.send(JSON.stringify(action.payload));
				} catch (e) {
					dispatch(onError((e as Error).message));
				}
				return;
			}

			if (socket && disconnect.match(action)) {
				connected = false;
				clearTimeout(reconnectTimer);
				reconnectTimer = 0;
				socket.close();
				socket = null;
				return;
			}

			next(action);
		};
	};
};
