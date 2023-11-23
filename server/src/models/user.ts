import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

export interface UserDocumentInterface extends Document {
  name: string;
  surname: string;
  username: string;
  email: string;
  dni: string;   
  image?: string;
}

const UserSchema = new Schema<UserDocumentInterface>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.default.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  dni: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value: string) {
      // We check with a regular expression if the dni is valid [0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][A-Z]
      const dniRegex = /^[0-9]{8}[A-Z]$/;
      if (!dniRegex.test(value)) {
        throw new Error('DNI is invalid');
      }
    }
  },
  image: {
    type: String,
    required: false,
    default : '/images/default.png',
    validate(value: string) {
      if (!validator.default.isURL(value)) {
        throw new Error('Image URL is invalid');
      }
    }
  }
});

export const User = model<UserDocumentInterface>('User', UserSchema);
