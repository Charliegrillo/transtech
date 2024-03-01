import  companies from './../../companies.json';
import { headers } from 'next/headers';

export default function tenant() {
    const headersList = headers();
	const hostname= headersList.get('host'); // to get domain
	const matches = hostname?.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/);
	let host:string = matches && matches[1] || '';
	const company =companies.filter(company => company.domain.includes(host) )[0];
    return company;
}
