import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';
import axios from 'axios';
import { createHeader } from 'src/common/utils';
import { ConfigService } from '@nestjs/config';
import { create, findAll, findOne, remove, update } from 'src/common/service-utilities';

const name_service = 'workout-exercises'

@Injectable()
export class WorkoutExerciseService {
  constructor(private readonly configService: ConfigService){}
  
  async create(data: CreateWorkoutExerciseDto, jwt: string) {
    return await create<CreateWorkoutExerciseDto>(data, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service);

  }

  async findAll(jwt: string) {
    return await findAll(jwt, this.configService.get('STRAPI_ENDPOINT'), name_service, true);
  }

  async findOne(id: number, jwt: string) {
    return await findOne(id, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service, true);
  }

  async update(id: number, data: UpdateWorkoutExerciseDto, jwt: string) {
    return await update<UpdateWorkoutExerciseDto>(id, data, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service);
  }

  async remove(id: number, jwt: string) {
    return await remove(id, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service);
  }
}
