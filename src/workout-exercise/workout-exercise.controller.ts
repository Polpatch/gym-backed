import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Req } from '@nestjs/common';
import { WorkoutExerciseService } from './workout-exercise.service';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';
import { JwtModificationInterceptor } from 'src/jwt-modification/jwt-modification.interceptor';
import { getJwt } from 'src/common/utils';

@Controller('workout-exercise')
@UseInterceptors(JwtModificationInterceptor)
export class WorkoutExerciseController {
  constructor(private readonly workoutExerciseService: WorkoutExerciseService) {}

  @Post()
  async create(@Body() createWorkoutExerciseDto: CreateWorkoutExerciseDto, @Req() request: Request) {
    const jwt = getJwt(request);
    return await this.workoutExerciseService.create(createWorkoutExerciseDto, jwt);
  }

  @Get()
  async findAll(@Req() request: Request) {
    const jwt = getJwt(request);
    return await this.workoutExerciseService.findAll(jwt);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() request: Request) {
    const jwt = getJwt(request);
    return await this.workoutExerciseService.findOne(+id, jwt);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWorkoutExerciseDto: UpdateWorkoutExerciseDto, @Req() request: Request) {
    const jwt = getJwt(request);
    return await this.workoutExerciseService.update(+id, updateWorkoutExerciseDto, jwt);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    const jwt = getJwt(request);
    return await this.workoutExerciseService.remove(+id, jwt);
  }
}
