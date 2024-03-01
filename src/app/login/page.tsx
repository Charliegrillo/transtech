import Form from '@/components/Form';
import tenant from './../../context/tenant';

const Login = async () => {
	const company = tenant();

	return (
		<main className='flex items-center justify-center h-screen w-screen'>
			{JSON.stringify(company)}
			<Form resseller= {company}/>
		</main>
	);
};

export default Login;
