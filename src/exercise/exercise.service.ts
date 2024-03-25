import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { createHeader } from 'src/common/utils';

@Injectable()
export class ExerciseService {
  constructor(private readonly configService: ConfigService){}

  async create(data: CreateExerciseDto, jwt: string) {
    try {
      const response = await axios.post(
        `${this.configService.get('STRAPI_ENDPOINT')}/api/exercises`,
        { data },
        createHeader(jwt),
      );

      console.log(`Richiesta eseguita con successo: ${response.data.id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Errore durante l'inserimento del dato: ${error.message}`);
      throw new HttpException('Errore interno del server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  async findAll(jwt: string) {
    try{
      const response = await axios.get(
        `${this.configService.get('STRAPI_ENDPOINT')}/api/exercises`,
        createHeader(jwt),
      )

      return response.data.data;

    } catch (error) {
      console.error(`Errore durante l'inserimento del dato: ${error.message}`);
      throw new HttpException('Errore interno del server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number, jwt: string) {
    try{
      const response = await axios.get(
        `${this.configService.get('STRAPI_ENDPOINT')}/api/exercises/${id}`,
        createHeader(jwt),
      )

      return response.data.data;

    } catch (error) {
      if(error.response.status === HttpStatus.NOT_FOUND)
        throw new HttpException(`Record ${id} non trovato`, HttpStatus.NOT_FOUND);

      console.error(`Errore durante l'inserimento del dato: ${error.message}`);
      throw new HttpException('Errore interno del server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, data: UpdateExerciseDto, jwt: string) {
    try {
      const response = await axios.put(
        `${this.configService.get('STRAPI_ENDPOINT')}/api/exercises/${id}`,
        { data },
        createHeader(jwt),
      );

      console.log(`Richiesta eseguita con successo: ${response.data.id}`);
      return response.data.data;
    } catch (error) {
      if(error.response.status === HttpStatus.NOT_FOUND)
        throw new HttpException(`Record ${id} non trovato`, HttpStatus.NOT_FOUND);
      
      console.error(`Errore durante l'inserimento del dato: ${error.message}`);
      throw new HttpException('Errore interno del server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number, jwt: string) {
    try{
      const response = await axios.delete(
        `${this.configService.get('STRAPI_ENDPOINT')}/api/exercises/${id}`,
        createHeader(jwt),
      )

      return response.data.data;

    } catch (error) {
      if(error.response.status === HttpStatus.NOT_FOUND)
        throw new HttpException(`Record ${id} non trovato`, HttpStatus.NOT_FOUND);

      console.error(`Errore durante l'inserimento del dato: ${error.message}`);
      throw new HttpException('Errore interno del server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
