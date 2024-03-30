import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { CryptoService } from 'src/crypto/crypto.service';

@Module({
  controllers: [ProgressController],
  providers: [ProgressService, CryptoService],
})
export class ProgressModule {}
