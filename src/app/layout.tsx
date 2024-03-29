import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TenantProvider } from '@/context/TenantContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Next Auth',
	description: 'Next Auth Middleware Authentication',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<body className={inter.className}>
				<TenantProvider >
					{children}
				</TenantProvider>
			</body>
		</html>
	);
}
