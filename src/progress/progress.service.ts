import { Injectable } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { create, findAll, findOne, remove, update } from 'src/common/service-utilities';
import { ConfigService } from '@nestjs/config';

const name_service = 'progresses'

@Injectable()
export class ProgressService {
  constructor(private readonly configService: ConfigService){}
  
  async create(data: CreateProgressDto, jwt) {
    return await create<CreateProgressDto>(data, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service);
  }

  async findAll(jwt: string, getAll: boolean) {
    return await findAll(jwt, this.configService.get('STRAPI_ENDPOINT'), name_service, getAll);
  }

  async findOne(id: number, jwt: string, getAll: boolean) {
    return await findOne(id, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service, getAll);
  }

  async update(id: number, data: UpdateProgressDto, jwt) {
    return await update<UpdateProgressDto>(id, data, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service);
  }

  async remove(id: number, jwt) {
    return await remove(id, jwt, this.configService.get('STRAPI_ENDPOINT'), name_service);
  }
}
