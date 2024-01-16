export interface UserDocumentInterface extends Document {
  name: string;
  password: string;
  surname: string;
  username: string;
  email: string;
  dni: string;   
  image?: Buffer;
}