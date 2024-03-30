import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { CryptoService } from 'src/crypto/crypto.service';

@Module({
  controllers: [WorkoutController],
  providers: [WorkoutService, CryptoService],
})
export class WorkoutModule {}
