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

  async findAll(): Promise<Property[]> {
    return this.prisma.property.findMany();
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
