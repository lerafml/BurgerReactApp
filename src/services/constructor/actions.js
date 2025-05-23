import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendOrder } from '../../utils/api';

export const makeOrder = createAsyncThunk(
	'constructor/makeOrder',
	async (items) => {
		return sendOrder(items);
	}
);
