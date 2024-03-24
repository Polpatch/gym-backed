import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseModule } from './exercise/exercise.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CryptoService } from './crypto/crypto.service';

@Module({
  imports: [ExerciseModule, AuthModule, ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    })],
  controllers: [AppController],
  providers: [AppService, CryptoService],
})
export class AppModule {}
