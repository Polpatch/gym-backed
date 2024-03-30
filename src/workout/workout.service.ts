import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { createHeader } from 'src/common/utils';
import { create, findAll, findOne, remove, update } from 'src/common/service-utilities';

const name_service = 'workouts'

@Injectable()
export class WorkoutService {
  constructor(private readonly configService: ConfigService){}

  async create(data: CreateWorkoutDto, jwt: string) {
    return await create<CreateWorkoutDto>(data, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service);
  }

  async findAll(jwt: string, getAll: boolean) {
    return await findAll(jwt, this.configService.get('STRAPI_ENDPOINT'), name_service, getAll);
  }

  async findOne(id: number, jwt: string, getAll: boolean) {
    return await findOne(id, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service, getAll);
  }

  async update(id: number, data: UpdateWorkoutDto, jwt: string) {
    return await update<UpdateWorkoutDto>(id, data, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service);
  }

  async remove(id: number, jwt: string) {
    return await remove(id, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service);
  }
}
