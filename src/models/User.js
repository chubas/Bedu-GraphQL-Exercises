import mongoose, { Schema } from 'mongoose';
import { CourseSchema } from './Course'

const UserSchema = new Schema({
  name: String,
  lastName: String,
  email: String,
  dateBirth: String,
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