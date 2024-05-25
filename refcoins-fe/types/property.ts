export type Property = {
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
  };

export type CreateProperty = Omit<Property, 'id'>;

export enum PropertyType {
    SingleFamily = "SingleFamily",
    Villa = "Villa",
  }
  
  export enum PropertyStatus {
    ForSale = "ForSale",
    ForRent = "ForRent",
  }