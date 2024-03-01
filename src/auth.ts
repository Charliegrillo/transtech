import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import tenant from './context/tenant';
import { userService } from './app/services/userService';

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				username: { label: 'username', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
				const company = tenant();

				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				myHeaders.append("Accept", "application/json");
				
				const { username, password } = credentials as {
					username: string
					password: string
				   };				
				let loginRes = await  userService.authenticate(username, password, company.ressellerID);
				if (!loginRes?.success) return null;

				const user:any = {
					id: loginRes.data?.id ?? '',
					name: loginRes.data?.name ?? '',
					email: loginRes.data?.email ?? '',
				};
				user.token = loginRes.data?.accessToken;            
				return user;
			},
		}),
	],
});
