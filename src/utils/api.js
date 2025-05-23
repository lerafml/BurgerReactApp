const apiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api/ingredients',
	headers: {
		'Content-Type': 'application/json',
	},
};

export const getIngredients = () => {
	return fetch(`${apiConfig.baseUrl}`, {
		headers: apiConfig.headers,
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(`Ошибка ${res.status}`);
	});
};
