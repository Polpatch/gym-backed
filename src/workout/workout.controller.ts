import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, Query } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { getJwt } from 'src/common/utils';
import { JwtModificationInterceptor } from 'src/jwt-modification/jwt-modification.interceptor';

@Controller('workout')
@UseInterceptors(JwtModificationInterceptor)
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  async create(@Body() createWorkoutDto: CreateWorkoutDto, @Req() request: Request) {
    const jwt = getJwt(request);
    return await this.workoutService.create(createWorkoutDto, jwt);
  }

  @Get()
  async findAll(@Req() request: Request, @Query('getAll') getAll: string) {
    const jwt = getJwt(request);
    return await this.workoutService.findAll(jwt, getAll === 'true');
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() request: Request, @Query('getAll') getAll: string) {
    const jwt = getJwt(request);
    return await this.workoutService.findOne(+id, jwt, getAll === 'true');
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto, @Req() request: Request) {
    const jwt = getJwt(request);
    return await this.workoutService.update(+id, updateWorkoutDto, jwt);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    const jwt = getJwt(request);
    return await this.workoutService.remove(+id, jwt);
  }
}
