import { Course } from '../models/Course';
import { User } from '../models/User';

const Query = {
  courses: () => {
    return Course.find().exec();
  },

  student: (_, { id }) => {
    return User.findOne({ _id: id }).exec();
  }
};

export default Query;