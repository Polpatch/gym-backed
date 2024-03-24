import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CryptoService } from 'src/crypto/crypto.service';

@Module({
  providers: [AuthService, CryptoService],
  controllers: [AuthController]
})
export class AuthModule {}
