const apiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api/ingredients',
	orderUrl: 'https://norma.nomoreparties.space/api/orders',
	headers: {
		'Content-Type': 'application/json',
	},
};

export const getIngredients = () => {
	return fetch(`${apiConfig.baseUrl}`, {
		headers: apiConfig.headers,
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}

			return Promise.reject(`Ошибка ${res.status}`);
		})
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
		.then((res) => {
			if (res.ok) {
				return res.json();
			}

			return Promise.reject(`Ошибка ${res.status}`);
		})
		.catch((error) => {
			return Promise.reject(`Ошибка ${error.message}`);
		});
};
