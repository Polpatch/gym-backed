import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class LoggingInterceptorInterceptor implements NestInterceptor {
  constructor(private readonly cryptoService: CryptoService){}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        ...data,
        jwt: this.cryptoService.encryptJwt(data.jwt),
      })),
    );
  }
}
