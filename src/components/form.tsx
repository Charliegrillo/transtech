'use client';

import { login } from '@/lib/actions';
import { useFormState } from 'react-dom';

const initialState = {
	message: "",
	errors: {}
};

const Form = (props:any) => {
	const [errorMsg, dispatch] = useFormState(login, undefined)
	return (
		<>
		<div className='flex flex-col'>
			<div className='flex flex-row mb-8'>
				<p>Welcome a {props.resseller?.name}</p>
			</div>
			<div className='flex flex-row'>
				<form action={dispatch} className='space-y-4 w-full max-w-sm'>
					<input required name='username' placeholder='username' />
					<input
						required
						name='password'
						type='password'
						placeholder='password'
					/>
					<button className='w-full' type='submit'>
						Submit
					</button>
					<p>{errorMsg}</p>
				</form>
			</div>
		</div>		
		</>
	);
};

export default Form;
