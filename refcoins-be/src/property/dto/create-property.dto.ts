import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { PropertyType, PropertyStatus } from '@prisma/client';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(PropertyType)
  @IsNotEmpty()
  type: PropertyType;

  @IsEnum(PropertyStatus)
  @IsNotEmpty()
  status: PropertyStatus;

  @IsNumber()
  @IsNotEmpty()
  area: number;
}
