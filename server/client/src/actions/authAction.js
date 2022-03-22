import axios from 'axios';
import { returnErrors } from './errorAction';
import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL
} from './types';

export const loadUser = () => (dispatch, getState) => {
	//User loading
	dispatch({ type: USER_LOADING });

	axios
		.get('/api/auth/user', tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR
			});
		});
};

export const tokenConfig = (getState) => {
	//get token from localstorage
	const token = getState().auth.token;
	//headers
	const config = {
		headers: {
			'Content-type': 'applicaiton/json'
		}
	};
	//if token, add to header
	if (token) {
		config.headers['x-auth-token'] = token;
	}
	return config;
};