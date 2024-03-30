import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors } from '@nestjs/common';
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
  create(@Body() createWorkoutDto: CreateWorkoutDto, @Req() request: Request) {
    const jwt = getJwt(request);
    return this.workoutService.create(createWorkoutDto, jwt);
  }

  @Get()
  findAll(@Req() request: Request) {
    const jwt = getJwt(request);
    return this.workoutService.findAll(jwt);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
    const jwt = getJwt(request);
    return this.workoutService.findOne(+id, jwt);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto, @Req() request: Request) {
    const jwt = getJwt(request);
    return this.workoutService.update(+id, updateWorkoutDto, jwt);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    const jwt = getJwt(request);
    return this.workoutService.remove(+id, jwt);
  }
}
