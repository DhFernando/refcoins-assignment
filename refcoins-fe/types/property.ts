export type Property = {
    id: number;
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

export enum PropertyType {
    SingleFamily = "SingleFamily",
    Villa = "Villa",
  }
  
  export enum PropertyStatus {
    ForSale = "ForSale",
    ForRent = "ForRent",
  }