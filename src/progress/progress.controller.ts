import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseInterceptors } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { getJwt } from 'src/common/utils';
import { JwtModificationInterceptor } from 'src/jwt-modification/jwt-modification.interceptor';

@Controller('progress')
@UseInterceptors(JwtModificationInterceptor)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  async create(@Body() createProgressDto: CreateProgressDto, @Req() request: Request) {
    const jwt = getJwt(request);
    return await this.progressService.create(createProgressDto, jwt);
  }

  @Get()
  async findAll(@Req() request: Request, @Query('getAll') getAll: string) {
    const jwt = getJwt(request);
    return await this.progressService.findAll(jwt, getAll === 'true');
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() request: Request, @Query('getAll') getAll: string) {
    const jwt = getJwt(request);
    return await this.progressService.findOne(+id, jwt, getAll === 'true');
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProgressDto: UpdateProgressDto, @Req() request: Request) {
    const jwt = getJwt(request);
    return await this.progressService.update(+id, updateProgressDto, jwt);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    const jwt = getJwt(request);
    return await this.progressService.remove(+id, jwt);
  }
}
