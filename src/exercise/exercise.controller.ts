import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Req } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { JwtModificationInterceptor } from 'src/jwt-modification/jwt-modification.interceptor';
import { getJwt } from 'src/common/utils';

@Controller('exercise')
@UseInterceptors(JwtModificationInterceptor)
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  async create(@Body() createExerciseDto: CreateExerciseDto, @Req() request: Request) {
    const jwt = getJwt(request);
    return await this.exerciseService.create(createExerciseDto, jwt);
  }

  @Get()
  async findAll(@Req() request: Request) {
    const jwt = getJwt(request);
    return await this.exerciseService.findAll(jwt);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() request: Request) {
    const jwt = getJwt(request);
    return await this.exerciseService.findOne(+id, jwt);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto, @Req() request: Request) {
    const jwt = getJwt(request);
    return await this.exerciseService.update(+id, updateExerciseDto, jwt);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    const jwt = getJwt(request);
    return await this.exerciseService.remove(+id, jwt);
  }
}
