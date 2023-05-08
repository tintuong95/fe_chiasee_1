import {createSlice} from '@reduxjs/toolkit';

import { loginAction, signupAction, validateToken} from '../actions/auth';
import {history} from '../../utils/history';

const initialState = {
	isLogin: false, //bolean
	user: {}, //object
	role: null, //int
	error: {
		logging: false,
	},
	loading: true,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		evtLogout: (state) => {
			state.error.logging = false;
			state.loading = true;
			state.role = null;
			state.isLogin = false;
			state.self = {};
			console.log('state.initialState');
			localStorage.clear();
			history.push('/login');
		},
	},
	extraReducers: (builder) => {
		//state, action
		builder.addCase(loginAction.fulfilled, (state, action) => {
			const {user, accessToken, refeshToken} = action.payload.data;
			localStorage.setItem('user', JSON.stringify(user));
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refeshToken', refeshToken);
			state.isLogin = true;
			state.user = user;
			history.push('/');
		});

		builder.addCase(loginAction.rejected, (state) => {
			state.error.logging = true;
		});

		// //state, action
		builder.addCase(validateToken.fulfilled, (state, action) => {
			// const {self, accessToken} = action.payload.data;
			// localStorage.setItem('details', JSON.stringify(self));
			// localStorage.setItem('accessToken', accessToken);
			// localStorage.setItem('isLogin', JSON.stringify(true));
			// localStorage.setItem('role', JSON.stringify(self.role));
			state.isLogin = true;
			state.user = JSON.parse(localStorage.getItem('user'));
			// state.loading = false;
			// state.self = self;
			// state.role = self.role;
		});
		
		builder.addCase(validateToken.rejected, (state) => {
			state.loading = false;
			history.push('/login');
		});

		//state, action
		builder.addCase(signupAction.fulfilled, (state, action) => {
			const {self, accessToken} = action.payload.data;
			localStorage.setItem('details', JSON.stringify(self));
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('isLogin', JSON.stringify(true));
			localStorage.setItem('role', JSON.stringify(self.role));
			state.isLogin = true;
			state.self = self;
			state.role = self.role;
			history.push('/');
		});

		builder.addCase(signupAction.rejected, (state) => {
			state.loading = true;
		});
	},
});

// Action creators are generated for each case reducer function
export const {evtLogout} = authSlice.actions;

export default authSlice.reducer;
