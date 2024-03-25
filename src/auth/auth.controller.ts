import { Body, Controller, Get, Post, Req, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggingInterceptorInterceptor } from 'src/logging-interceptor/logging-interceptor.interceptor';
import { JwtModificationInterceptor } from 'src/jwt-modification/jwt-modification.interceptor';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get('user')
    @UseInterceptors(JwtModificationInterceptor)
    async userInfo(@Req() request: Request){
        const jwt = request.headers['authorization']?.split(' ')[1];

        return this.authService.userInfo(jwt);
    }

    @Post('login')
    @UseInterceptors(LoggingInterceptorInterceptor)
    async login(@Body() body: any){
        return this.authService.login(body.username, body.password);
    }

    @Post('signin')
    @UseInterceptors(LoggingInterceptorInterceptor)
    async signin(@Body() body: any){
        return this.authService.signin(body.username, body.email, body.password);
    }
}
