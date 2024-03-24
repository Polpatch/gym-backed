import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class JwtModificationInterceptor implements NestInterceptor {
  constructor(private cryptoService: CryptoService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const jwt = request.headers['authorization']?.split(' ')[1];
    
    // Modifica il JWT
    const modifiedJwt = this.cryptoService.decryptJwt(jwt);

    // Aggiungi il JWT modificato all'header della richiesta in uscita
    request.headers.authorization = `Bearer ${modifiedJwt}`;

    return next.handle().pipe(
      tap(() => console.log('Request intercepted and JWT modified')),
    );
  }
}
