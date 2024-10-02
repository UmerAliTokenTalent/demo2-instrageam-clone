import mongoose, { Document, Schema } from 'mongoose';

interface IData extends Document {
  name: string;
  fatherName: string;
  country: string;
  address: string;
  gender: string;
  description: string;
  summary: string;
}

const DataSchema: Schema = new Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  description: { type: String, required: true },
  summary: { type: String, required: true },
});

export const DataModel = mongoose.model<IData>('Data', DataSchema);

