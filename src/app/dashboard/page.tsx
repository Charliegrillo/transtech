import { auth } from '@/auth';
import { logout } from '@/lib/actions';
import { Button } from '@/components/ui/button';

const Protected = async () => {
	return (
		<form
			action={logout}
			className='h-screen w-screen flex flex-col justify-center items-center gap-10'
		>
			<Button type='submit' className='w-40' variant='secondary'>
				logout
			</Button>
		</form>
	);
};

export default Protected;
