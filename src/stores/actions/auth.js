import {createAsyncThunk} from '@reduxjs/toolkit';
import {loginApi, signupApi, validateTokenApi} from '../../apis/auth';

const LOGIN_ACTION = 'LOGIN_ACTION';
const SIGNUP_ACTION = 'SIGNUP_ACTION';
const VALIDATE_TOKEN_ACTION = 'VALIDATE_TOKEN_ACTION';

export const loginAction = createAsyncThunk(
	LOGIN_ACTION,
	//payload, thunkAPI
	async (payload) => {
		return await loginApi(payload);
	}
);

export const signupAction = createAsyncThunk(
	SIGNUP_ACTION,
	//payload, thunkAPI
	async (payload) => {
		return await signupApi(payload);
	}
);

export const validateToken = createAsyncThunk(
	VALIDATE_TOKEN_ACTION,
	//payload, thunkAPI
	async (payload) => {
		return await validateTokenApi(payload);
	}
);
