import {axios} from '../configs/axios';

export const loginApi = (data) => axios.post(`/auth/login`, data);

export const signupApi = (data) => axios.post(`/auth/register`, data);

export const changePasswordApi = (data) =>
	axios.post(`/auth/change-password`, data);

export const validateTokenApi = () => axios.get(`/auth/re-login`);

export const updateProfile = (data) =>
	axios.post(`/auth/update-user-profile`, data);

export const getProfile = () => axios.get(`/auth/profile`);
