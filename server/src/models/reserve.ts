import { Date, Document, model, Schema } from 'mongoose';

export interface ReserveDocument extends Document {
  houseId: string;
  userDni: string;
  enterDate: Date;
  exitDate: Date;
}

const ReserveSchema = new Schema<ReserveDocument>({
  houseId: {
    type: String,
    required: true,
    trim: true,
  },
  userDni: {
    type: String,
    required: true,
    trim: true,
  },
  enterDate: {
    type: Date,
    required: true,
    trim: true,
  },
  exitDate: {
    type: Date,
    required: true,
  },
});


export const ReserveModel = model<ReserveDocument>('Reserve', ReserveSchema);

