'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';

type FormState = {
	message: string
};
const defaultValues = {
	email: '',
	password: '',
};

export async function login(  prevState: any | undefined,
	formData: FormData,) {
		try {
			await signIn('credentials', {
			  username: formData.get("username"),
			  password:  formData.get("password")
			 });
		  } catch (error) {
			if (error instanceof AuthError) {
			  switch (error.type) {
				case 'CredentialsSignin':
				  return 'Invalid credentials.';
				default:
				  return 'Something went wrong.';
			  }
			}
			throw error;
		  }
}

export async function logout() {
	await signOut();
}
