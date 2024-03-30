import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ConfigService } from '@nestjs/config';
import { create, findAll, findOne, remove, update } from 'src/common/service-utilities';

const name_service = 'exercises'

@Injectable()
export class ExerciseService {
  constructor(private readonly configService: ConfigService){}

  async create(data: CreateExerciseDto, jwt: string) {
    return await create<CreateExerciseDto>(data, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service);
  }
  

  async findAll(jwt: string, getAll) {
    return await findAll(jwt, this.configService.get('STRAPI_ENDPOINT'), name_service, getAll);
  }

  async findOne(id: number, jwt: string, getAll) {
    return await findOne(id, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service, getAll);
  }

  async update(id: number, data: UpdateExerciseDto, jwt: string) {
    return await update<UpdateExerciseDto>(id, data, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service);
  }

  async remove(id: number, jwt: string) {
    return await remove(id, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service);
  }
}
