import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    return await this.propertyService.create(createPropertyDto);
  }

  @Get('totalPropertyCount')
  async totalPropertyCount(
    @Query('type') type: string, // Type filter
    @Query('status') status: string, // Status filter
    @Query('location') location: string,
  ) {
    return await this.propertyService.totalPropertyCount(type,status, location)
  }

  @Get()
  async findAll( 
    @Query('page', ParseIntPipe) page: number = 1, 
    @Query('pageSize', ParseIntPipe) pageSize: number = 3,
    @Query('type') type: string, // Type filter
    @Query('status') status: string, // Status filter
    @Query('location') location: string,
  ) {
    return await this.propertyService.findAll(page, pageSize,type,status, location);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.propertyService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return await this.propertyService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.propertyService.remove(id);
  }
}
