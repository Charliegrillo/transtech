'use client';

import { login } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
					<Input required name='username' placeholder='username' />
					<Input
						required
						name='password'
						type='password'
						placeholder='password'
					/>
					<Button variant='secondary' className='w-full' type='submit'>
						Submit
					</Button>
					<p>{errorMsg}</p>
				</form>
			</div>
		</div>		
		</>
	);
};

export default Form;
