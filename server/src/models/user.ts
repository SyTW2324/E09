import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

export interface UserDocumentInterface extends Document {
  name: string;
  password: string;
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
  password: {
    type: String,
    required: true,
    trim: true,
    validate(password: string) {
      if (password.length < 4) {
        throw new Error('Password is too short (min 4 characters)');
      }
      if (password.length > 30) {
        throw new Error('Password is too long (max 30 characters)');
      }
      const hasUppercase = /[A-Z]/.test(password);
      if (!hasUppercase) {
        throw new Error('Password needs an uppercase letter)');
      }
      const hasLowercase = /[a-z]/.test(password);
      if (!hasLowercase) {
        throw new Error('Password needs an lowercase letter)');
      }
      const hasNumber = /[0-9]/.test(password);
      if (!hasNumber) {
        throw new Error('Password needs a number)');
      }
    }
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
    default : 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg',
    validate(value: string) {
      if (!validator.default.isURL(value)) {
        throw new Error('Image URL is invalid');
      }
    }
  }
});

export const User = model<UserDocumentInterface>('User', UserSchema);
