
'use client'
import { logout } from '@/lib/actions';
import { useTenantContext } from '@/context/TenantContext';

const About = async () => {
	const { tenant, setTenant } = useTenantContext();
	
	return (
		<form
			action={logout}
			className='h-screen w-screen flex flex-col justify-center items-center gap-10'
		>
			<p className='text-white'>{tenant}</p>
			<button type='submit' className='w-40'>
				logout
			</button>
		</form>
	);
};

export default About;
