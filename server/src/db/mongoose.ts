import { connect } from 'mongoose';

try {
  await connect(process.env.ATLAS_URI!);
  console.log('Connection to MongoDB server established');
} catch (error) {
  console.log(error);
}