import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { CryptoService } from 'src/crypto/crypto.service';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService, CryptoService],
})
export class ExerciseModule {}
