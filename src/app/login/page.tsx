import Form from '@/components/form';
import tenant from './../../context/tenant';

const Login = async () => {
	const company = tenant();

	return (
		<main className='flex items-center justify-center h-screen w-screen'>
			<Form resseller= {company}/>
		</main>
	);
};

export default Login;
