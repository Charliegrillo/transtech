
'use client'
import { logout } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { useTenantContext } from '@/context/TenantContext';

const About = async () => {
	const { tenant, setTenant } = useTenantContext();
	
	return (
		<form
			action={logout}
			className='h-screen w-screen flex flex-col justify-center items-center gap-10'
		>
			<p className='text-white'>{tenant}</p>
			<Button type='submit' className='w-40' variant='secondary'>
				logout
			</Button>
		</form>
	);
};

export default About;
