import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { LoggingInterceptorInterceptor } from 'src/logging-interceptor/logging-interceptor.interceptor';

@Injectable()
export class AuthService {
    constructor(private readonly configService: ConfigService){}
    
    async userInfo(jwt: Request){
        const response = await axios.get(`${this.configService.get('STRAPI_ENDPOINT')}/api/users/me`,
        {
            headers:{
                'authorization': `Bearer ${jwt}`
            }
        });

        return response.data;
    }

    async login(identifier: string, password: string): Promise<any>{
        const response = await axios.post(`${this.configService.get('STRAPI_ENDPOINT')}/api/auth/local`,{
            identifier,
            password
        });

        return response.data;
    }

    async signin(username: string, email: string, password: string): Promise<any>{
        const response = await axios.post(`${this.configService.get('STRAPI_ENDPOINT')}/api/auth/local/register`,{
            email,
            username,
            password
        });

        return response.data;
    }
}
