import { Injectable, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property, PropertyType, PropertyStatus } from '@prisma/client';
import { DeletePropertyResponseDto } from './dto/delete-property-response.dto';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePropertyDto): Promise<Property> {
    try {
      const propertyData = {
        ...data,
        type: data.type as PropertyType,
        status: data.status as PropertyStatus,
      };
      return this.prisma.property.create({
        data: propertyData,
      });
    } catch (error) {
      throw new BadRequestException('Failed to create property');
    }
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

    if (type) where.type = type as PropertyType;
    if (status) where.status = status as PropertyStatus;
    if (location) where.location = location as string;

    try {
      return this.prisma.property.findMany({
        where,
        take: pageSize,
        skip: skip,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to find properties');
    }
  }

  async totalPropertyCount(): Promise<number> {
    try {
      return await this.prisma.property.count();
    } catch (error) {
      throw new BadRequestException('Failed to count properties');
    }
  }

  async findOne(id: string): Promise<Property> {
    try {
      const property = await this.prisma.property.findUnique({
        where: { id },
      });
      if (!property) {
        throw new NotFoundException(`Property with ID ${id} not found`);
      }
      return property;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to find property');
    }
  }

  async update(id: string, data: UpdatePropertyDto): Promise<Property> {
    const propertyData = {
      ...data,
      type: data.type as PropertyType,
      status: data.status as PropertyStatus,
    };

    try {
      const property = await this.prisma.property.findUnique({
        where: { id },
      });
      if (!property) {
        throw new NotFoundException(`Property with ID ${id} not found`);
      }

      return this.prisma.property.update({
        where: { id },
        data: propertyData,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update property');
    }
  }

  async remove(id: string): Promise<DeletePropertyResponseDto> {
    try {
      const property = await this.prisma.property.findUnique({
        where: { id },
      });
      if (!property) {
        throw new NotFoundException(`Property with ID ${id} not found`);
      }

      const deletedProperty = await this.prisma.property.delete({
        where: { id },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Property successfully deleted',
        property: deletedProperty,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete property');
    }
  }
}
