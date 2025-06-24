const BASE_URL = 'https://norma.nomoreparties.space/api';
const apiConfig = {
	baseUrl: `${BASE_URL}/ingredients`,
	orderUrl: `${BASE_URL}/orders`,
	pswResetUrl: `${BASE_URL}/password-reset`,
	resetUrl: `${BASE_URL}/password-reset/reset`,
	registerUrl: `${BASE_URL}/auth/register`,
	loginUrl: `${BASE_URL}/auth/login`,
	logoutUrl: `${BASE_URL}/auth/logout`,
	tokenUrl: `${BASE_URL}/auth/token`,
	authUrl: `${BASE_URL}/auth/user`,
	headers: {
		'Content-Type': 'application/json',
	},
	headersAuth: {
		'Content-Type': 'application/json',
		authorization: localStorage.getItem('accessToken'),
	},
};

const checkReponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
	return fetch(`${apiConfig.baseUrl}`, {
		headers: apiConfig.headers,
	})
		.then(checkReponse)
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const sendOrder = (ids) => {
	return fetch(`${apiConfig.orderUrl}`, {
		method: 'POST',
		headers: apiConfig.headersAuth,
		body: JSON.stringify({ ingredients: ids }),
	})
		.then(checkReponse)
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const registerUser = ({ email, password, name }) => {
	return fetch(`${apiConfig.registerUrl}`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({ email: email, password: password, name: name }),
	})
		.then(checkReponse)
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

export const authorizeUser = ({ email, password }) => {
	return fetch(`${apiConfig.loginUrl}`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({ email: email, password: password }),
	})
		.then(checkReponse)
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

export const refreshToken = () => {
	return fetch(`${apiConfig.tokenUrl}`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	})
		.then(checkReponse)
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

export const logoutUser = () => {
	return fetch(`${apiConfig.logoutUrl}`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	})
		.then(checkReponse)
		.then(() => {
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('accessToken');
		})
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const getUser = () => {
	return fetchWithRefresh(`${apiConfig.authUrl}`, {
		method: 'GET',
		headers: apiConfig.headersAuth,
	}).catch((error) => {
		return Promise.reject(`Ошибка ${error.message}`);
	});
};

export const updateUser = ({ email, password, name }) => {
	return fetchWithRefresh(`${apiConfig.authUrl}`, {
		method: 'PATCH',
		headers: apiConfig.headersAuth,
		body: JSON.stringify({ email: email, password: password, name: name }),
	})
		.then(checkReponse)
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const resetPassword = (mail) => {
	return fetch(`${apiConfig.pswResetUrl}`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({ email: mail }),
	})
		.then(checkReponse)
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const resetPasswordConfirm = ({ password, token }) => {
	return fetch(`${apiConfig.resetUrl}`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({ password: password, token: token }),
	})
		.then(checkReponse)
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const fetchWithRefresh = async (url, options) => {
	try {
		const res = await fetch(url, options);
		return await checkReponse(res);
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken(); //обновляем токен
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options); //повторяем запрос
			return await checkReponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};
