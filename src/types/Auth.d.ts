import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface IRegister {
	fullName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface IActivation {
	code: string;
}

interface ILogin {
	identifier: string;
	password: string;
}

interface UserExtended extends User {
	accessToken?: string;
	role?: string;
}

interface SessionExtended extends Session {
	accessToken?: string;
}

interface JWTExtended extends JWT {
	user?: UserExtended;
}

interface IProfile {
	userId?: string;
	email?: string;
	fullName?: string;
	birthDate?: string;
	phone?: string;
	gender?: string;
	avatar?: string;
	profilePicture?: string | FileList;
	role?: string;
}

interface IUpdatePassword {
	oldPassword: string;
	password: string;
	confirmPassword: string;
}

export type {
	IRegister,
	IActivation,
	ILogin,
	UserExtended,
	SessionExtended,
	JWTExtended,
	IProfile,
	IUpdatePassword,
};
