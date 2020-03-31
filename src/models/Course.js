import mongoose, { Schema } from 'mongoose';

const CourseSchema = new Schema({
  name: String,
  description: String,
  category: String,
  startsOn: Date,
  endsOn: Date
}, {
  timestamps: true,
});

const CourseModel = mongoose.model('Course', CourseSchema);
export { CourseSchema, CourseModel as Course };