import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from '@/lib/routes';
import { NextRequest, NextResponse } from 'next/server';
import subdomains from './../subdomains.json'
const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const url = req.nextUrl;
	const isAuthenticated = !!req?.auth ;

	const hostname = req.headers.get("host");
	const request = requestInfo(hostname);
  
	const allowedDomains = ["localhost", "dev-server.site"];
	const isAllowedDomain = allowedDomains.some(domain => request.domain.includes(domain));
  
	if (isAllowedDomain && (!request.subDomain)) {
		return VerifyAuth(req,isAuthenticated);
	}
	if (isAllowedDomain && (request.subDomain)) {
	  if (subdomains.some(d => d.subdomain === request.subDomain)) {
		return VerifyAuth(req,isAuthenticated);
	  }
	}
	return new Response(null, { status: 404 });
});

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

const VerifyAuth = (req: NextRequest, isAuthenticated: boolean) => {
	const { nextUrl } = req;
	const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

	if (isAuthenticated && nextUrl.pathname=='/login'){
		console.log("VerifyAuth");
		return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
	}

	if (!isAuthenticated && !isPublicRoute)
		return Response.redirect(new URL(ROOT, nextUrl));

	return NextResponse.next();	
};

const requestInfo = (url: string | null) => {
	const matches = url?.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/);
	let hostname = matches && matches[1];
	
	let sections = hostname ? hostname?.split('.').reverse() : '';
	let nSections: number = sections ? sections?.length: 0;
  
	let domain = undefined;
	let subDomain = undefined;
	if (sections[0] ==='localhost'){
	  domain = sections[0];
	  if (nSections > 1){
		subDomain = sections[1];
	  }
	} else {
	   domain = sections[1]+"."+sections[0];
	  if (nSections > 2){
		subDomain = sections[2];
	  }    
	}
   return({domain, subDomain});
  }