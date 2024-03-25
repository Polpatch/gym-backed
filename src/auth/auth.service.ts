import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { createHeader } from 'src/common/utils';

@Injectable()
export class AuthService {
    constructor(private readonly configService: ConfigService){}
    
    async userInfo(jwt: string){
        const response = await axios.get(`${this.configService.get('STRAPI_ENDPOINT')}/api/users/me`,
            createHeader(jwt),
        );

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
