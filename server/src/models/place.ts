import { Document, model, Schema } from 'mongoose';

export interface HouseDocument extends Document {
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
}

const HouseSchema = new Schema<HouseDocument>({
  address: {
    type: String,
    required: true,
    trim: true,
  },
  bedrooms: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: 'Bedrooms must be an integer',
    },
  },
  bathrooms: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: 'Bathrooms must be an integer',
    },
  },
  squareFeet: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: 'Square feet must be an integer',
    },
  },
  rentAmount: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: 'Rent amount must be an integer',
    },
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
  location: {
    type: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  images: {
    type: [String],
  },
});

export const HouseModel = model<HouseDocument>('House', HouseSchema);

