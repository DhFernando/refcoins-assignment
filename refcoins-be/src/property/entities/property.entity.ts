import { PropertyType, PropertyStatus, Property as PropertyModel } from '@prisma/client';

export class PropertyEntity implements PropertyModel {
  id: string;
  title: string;
  image: string;
  slug: string;
  location: string;
  description: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  area: number;
  createdAt: Date;
  updatedAt: Date;
}
