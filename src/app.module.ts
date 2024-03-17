import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseController } from './exercise/exercise.controller';

@Module({
  imports: [],
  controllers: [AppController, ExerciseController],
  providers: [AppService],
})
export class AppModule {}
