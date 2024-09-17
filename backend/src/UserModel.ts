import mongoose, { Document, Schema } from 'mongoose'

interface IUser extends Document {
  email: string
  password: string
}

const UserSchema: Schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true }
})

const UserModel = mongoose.model<IUser>('User', UserSchema)

export { UserModel, IUser }