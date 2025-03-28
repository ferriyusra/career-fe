import instance from '@/libs/axios/instance';
import {
	IRegister,
	IActivation,
	ILogin,
	IProfile,
	IUpdatePassword,
} from '@/types/Auth';
import endpoint from './endpoint.constant';

const authServices = {
	register: (payload: IRegister) =>
		instance.post(`${endpoint.AUTH}/register`, payload),

	activation: (payload: IActivation) =>
		instance.post(`${endpoint.AUTH}/activation`, payload),

	login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),

	getProfileWithToken: (token: string) =>
		instance.get(`${endpoint.AUTH}/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	getProfile: () => instance.get(`${endpoint.AUTH}/me`),
	updateProfile: (payload: IProfile) =>
		instance.put(`${endpoint.AUTH}/update-profile`, payload),
	updatePassword: (payload: IUpdatePassword) =>
		instance.put(`${endpoint.AUTH}/update-password`, payload),
};

export default authServices;
