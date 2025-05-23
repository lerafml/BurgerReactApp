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

export const sendOrder = (items) => {
	const ids = items.map((i) => i.item._id);
	console.log(ids);
	return fetch('https://norma.nomoreparties.space/api/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ingredients: ids }),
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(`Ошибка ${res.status}`);
	});
};
