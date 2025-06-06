const apiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api/ingredients',
	orderUrl: 'https://norma.nomoreparties.space/api/orders',
	pswResetUrl: 'https://norma.nomoreparties.space/api/password-reset',
	resetUrl: 'https://norma.nomoreparties.space/api/password-reset/reset',
	registerUrl: 'https://norma.nomoreparties.space/api/auth/register',
	loginUrl: 'https://norma.nomoreparties.space/api/auth/login',
	logoutUrl: 'https://norma.nomoreparties.space/api/auth/logout',
	tokenUrl: 'https://norma.nomoreparties.space/api/auth/token',
	authUrl: 'https://norma.nomoreparties.space/api/auth/user',
	headers: {
		'Content-Type': 'application/json',
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
		headers: apiConfig.headers,
		body: JSON.stringify({ ingredients: ids }),
	})
		.then(checkReponse)
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const registerUser = (email, psw, name) => {
	return fetch(`${apiConfig.registerUrl}`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({ email: email, password: psw, name: name }),
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

export const authorizeUser = (email, psw) => {
	return fetch(`${apiConfig.loginUrl}`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({ email: email, password: psw }),
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
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const getUser = () => {
	return fetchWithRefresh(`${apiConfig.authUrl}`, {
		method: 'GET',
		headers: apiConfig.headers,
	})
		.then(checkReponse)
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};

export const updateUser = (email, psw, name) => {
	return fetchWithRefresh(`${apiConfig.authUrl}`, {
		method: 'PATCH',
		headers: apiConfig.headers,
		body: JSON.stringify({ email: email, password: psw, name: name }),
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

export const resetPasswordConfirm = (psw, code) => {
	return fetch(`${apiConfig.pswResetUrl}`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({ password: psw, token: code }),
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
