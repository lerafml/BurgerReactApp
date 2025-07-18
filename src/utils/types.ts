export interface IIngredient {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
}

export interface ConstructorIngredient {
	item: IIngredient;
	key: string;
}

export interface IUser {
	email: string;
	name: string;
}

export interface IRegisterUser extends IUser {
	password: string;
}

export interface IAuthUser {
	email: string;
	password: string;
}

export interface IRegisterData extends IRefreshTokenData {
	user: IUser;
}

export interface IRefreshTokenData {
	success: boolean;
	accessToken: string;
	refreshToken: string;
}

export interface IGetUserData {
	success: boolean;
	user: IUser;
}

export interface IGetIngredientsData {
	success: boolean;
	data: IIngredient[];
}

export interface IOrder {
	name: string;
	order: { number: number };
	success: boolean;
}

export interface IMessageData {
	success: boolean;
	message: string;
}

export interface IResetPassword {
	password: string;
	token: string;
}

export interface IOrderDetails {
	ingredients: Array<string>;
	_id: string;
	status: 'done' | 'created' | 'pending';
	number: number;
	createdAt: string;
	updatedAt: string;
	name: string;
}
export interface IGetOrderData {
	success: boolean;
	orders: IOrderDetails[];
}

export interface IGetFeedData extends IGetOrderData {
	total: number;
	totalToday: number;
}
