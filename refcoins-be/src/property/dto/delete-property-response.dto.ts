import { Property } from "@prisma/client";

// src/property/dto/delete-property-response.dto.ts
export class DeletePropertyResponseDto {
    statusCode: number;
    message: string;
    property: Property;
  }
  