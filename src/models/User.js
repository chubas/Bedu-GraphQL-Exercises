import mongoose, { Schema } from 'mongoose';
import { CourseSchema } from './Course'

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  birthDate: String,
  password: String,
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
}, {
  timestamps: true,
});

const UserModel = mongoose.model('User', UserSchema);
export { UserSchema, UserModel as User };