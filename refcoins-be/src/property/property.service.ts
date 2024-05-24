import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property, PropertyType, PropertyStatus } from '@prisma/client';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePropertyDto): Promise<Property> {
    const propertyData = {
      ...data,
      type: data.type as PropertyType,
      status: data.status as PropertyStatus,
    };
    return this.prisma.property.create({
      data: propertyData,
    });
  }

  

  async findAll(
    page: number = 1,
    pageSize: number = 3,
    type?: string,
    status?: string,
    location?: string,
  ): Promise<Property[]> {  
    const skip = (page - 1) * pageSize;
    const where: any = {}; 
    
    // Apply filters if provided
    if (type) where.type = type as PropertyType; 
    if (status) where.status = status as PropertyStatus; 
    if (location) where.location = location as string;
    
    return this.prisma.property.findMany({
      where,
      take: pageSize,
      skip: skip,
    });
  }
   
  async totalPropertyCount(): Promise<number> {  
    return await this.prisma.property.count();
  }

  async findOne(id: string): Promise<Property> {
    return this.prisma.property.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdatePropertyDto): Promise<Property> {
    const propertyData = {
      ...data,
      type: data.type as PropertyType,
      status: data.status as PropertyStatus,
    };
    return this.prisma.property.update({
      where: { id },
      data: propertyData,
    });
  }

  async remove(id: string): Promise<Property> {
    return this.prisma.property.delete({
      where: { id },
    });
  }
}
