export interface Data {
  ownerDni: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  rentAmount: number;
  isAvailable: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  country: string;
  images?: string[];
  _id: string;
}

export interface MatrixOfCardsProps {
  dataArray: Data[];
}

export interface BasicExampleProps {
  data: Data;
}