import {
	IAuthUser,
	IGetIngredientsData,
	IGetOrderData,
	IGetUserData,
	IMessageData,
	IOrder,
	IRefreshTokenData,
	IRegisterData,
	IRegisterUser,
	IResetPassword,
} from './types';

export const PROFILE_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';
export const FEED_URL = `${PROFILE_ORDERS_URL}/all`;
export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const apiConfig = {
	baseUrl: `${BASE_URL}/ingredients`,
	orderUrl: `${BASE_URL}/orders`,
	pswResetUrl: `${BASE_URL}/password-reset`,
	resetUrl: `${BASE_URL}/password-reset/reset`,
	registerUrl: `${BASE_URL}/auth/register`,
	loginUrl: `${BASE_URL}/auth/login`,
	logoutUrl: `${BASE_URL}/auth/logout`,
	tokenUrl: `${BASE_URL}/auth/token`,
	authUrl: `${BASE_URL}/auth/user`,
	getOrderUrl: `${BASE_URL}/orders`,
	headers: {
		'Content-Type': 'application/json',
	},
	headersAuth: {
		'Content-Type': 'application/json',
		authorization: localStorage.getItem('accessToken') || '',
	},
};

const checkReponse = <T>(res: Response): Promise<T> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = (): Promise<IGetIngredientsData> => {
	return fetch(`${apiConfig.baseUrl}`, {
		headers: apiConfig.headers,
	})
		.then(checkReponse<IGetIngredientsData>)
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const sendOrder = (ids: Array<string>): Promise<IOrder> => {
	return fetch(`${apiConfig.orderUrl}`, {
		method: 'POST',
		headers: apiConfig.headersAuth,
		body: JSON.stringify({ ingredients: ids }),
	})
		.then(checkReponse<IOrder>)
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const registerUser = ({
	email,
	password,
	name,
}: IRegisterUser): Promise<IRegisterData> => {
	return fetch(`${apiConfig.registerUrl}`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({ email: email, password: password, name: name }),
	})
		.then(checkReponse<IRegisterData>)
		.then((refreshData) => {
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
			return refreshData;
		})
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const authorizeUser = ({
	email,
	password,
}: IAuthUser): Promise<IRegisterData> => {
	return fetch(`${apiConfig.loginUrl}`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({ email: email, password: password }),
	})
		.then(checkReponse<IRegisterData>)
		.then((refreshData) => {
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
			return refreshData;
		})
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const refreshToken = (): Promise<IRefreshTokenData> => {
	return fetch(`${apiConfig.tokenUrl}`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	})
		.then(checkReponse<IRefreshTokenData>)
		.then((refreshData) => {
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
			return refreshData;
		})
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const logoutUser = (): Promise<IMessageData> => {
	return fetch(`${apiConfig.logoutUrl}`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	})
		.then(checkReponse<IMessageData>)
		.then((data) => {
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('accessToken');
			return data;
		})
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const getUser = (): Promise<IGetUserData> => {
	return fetchWithRefresh<IGetUserData>(`${apiConfig.authUrl}`, {
		method: 'GET',
		headers: apiConfig.headersAuth,
	}).catch((error) => {
		return Promise.reject(`Ошибка ${error.message}`);
	});
};

export const updateUser = (data: IRegisterUser): Promise<IGetUserData> => {
	return fetchWithRefresh<IGetUserData>(`${apiConfig.authUrl}`, {
		method: 'PATCH',
		headers: apiConfig.headersAuth,
		body: JSON.stringify(data),
	}).catch((error) => {
		return Promise.reject(`Ошибка ${error.message}`);
	});
};

export const resetPassword = (mail: string): Promise<IMessageData> => {
	return fetch(`${apiConfig.pswResetUrl}`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({ email: mail }),
	})
		.then(checkReponse<IMessageData>)
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const resetPasswordConfirm = ({
	password,
	token,
}: IResetPassword): Promise<IMessageData> => {
	return fetch(`${apiConfig.resetUrl}`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({ password: password, token: token }),
	})
		.then(checkReponse<IMessageData>)
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const getOrder = (number: number): Promise<IGetOrderData> => {
	return fetchWithRefresh<IGetOrderData>(`${apiConfig.getOrderUrl}/${number}`, {
		method: 'GET',
		headers: apiConfig.headersAuth,
	}).catch((error) => {
		return Promise.reject(`Ошибка ${error.message}`);
	});
};

export const fetchWithRefresh = async <T>(
	url: string,
	options: RequestInit & { headers: { authorization?: string } }
): Promise<T> => {
	try {
		const res = await fetch(url, options);
		return await checkReponse<T>(res);
	} catch (err) {
		if (err instanceof Error && err.message === 'jwt expired') {
			const refreshData = await refreshToken(); //обновляем токен
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options); //повторяем запрос
			return await checkReponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};
