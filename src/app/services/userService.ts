import { cookies } from 'next/headers'

export const userService = {
    authenticate
};

export interface User {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    accessToken?: any
    refreshToken?: any
  }

async function authenticate(username: string, password: string, ressellerID: string) {
    const cookieStore = cookies();

    const credentials = {
        "username": username,
        "password": password
    }
    const urlAPI = process.env.API_BACKEND as string;
  
    const reqToken = await fetch(`${urlAPI}/auth/signin/${ressellerID}`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" }
    })
    const responseToken = await reqToken.json()    
    cookies().set('reqToken', `${urlAPI}/auth/signin/${ressellerID}`);


    if (reqToken.ok && responseToken) {
        const reqUser = await fetch(`${urlAPI}/user/profile`, {
            method: 'GET',
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " +  responseToken.accessToken}
          })
          const responseUser = await reqUser.json();
          cookies().set('responseUser', JSON.stringify(responseUser));

          const sessionUser: User = {
            name: responseUser.firstName,
            email: responseUser.email,
            id: responseUser.id
          }
          return { 
            success: true, 
            data: sessionUser
          } 
    }
    return { 
        success: false
    }
}