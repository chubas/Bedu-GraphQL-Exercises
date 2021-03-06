import { User } from '../src/models/User';
import { Course } from '../src/models/Course';
import mongoose from 'mongoose';
import 'dotenv/config';

const APP_MONGO_URI = process.env.APP_MONGO_URI;

const seed = async () => {
  // Delete our records first
  await User.deleteMany({});
  await Course.deleteMany({});

  // Create Course models
  const backend = await Course.create({
    name: 'Backend Development',
    description: 'Learn Backend development using Express and GraphQL',
    category: 'Development',
    startDate: '2020-17-03',
    endDate: '2020-02-04'
  });
  const frontend = await Course.create({
    name: 'Frontend Development',
    description: 'learn Frontend development with React',
    category: 'Development',
    startDate: '2020-07-05',
    endDate: '2020-28-05'
  });
  const design = await Course.create({
    name: 'Web design',
    description: 'Learn Web design fundamentals: HTML & CSS',
    category: 'Design',
    startDate: '2020-24-03',
    endDate: '2020-09-04'
  });

  // Create User models
  const user1 = await User.create({
    firstName: 'Juan',
    lastName: 'Perez',
    birthDate: '1998-29-01',
    email: 'juan@gmail.com',
    courses: [backend._id]
  });
  const user2 = await User.create({
    firstName: 'Maria',
    lastName: 'Lopez',
    birthDate: '1993-10-03',
    email: 'maria@hotmail.com',
    courses: [backend._id, frontend._id]
  });
  const user3 = await User.create({
    firstName: 'Jorge',
    lastName: 'Hernandez',
    birthDate: '1996-07-11',
    email: 'jorge@gmail.com',
    courses: [frontend._id, design._id]
  });
}

mongoose.connect(APP_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  return seed();
})
.then(() => {
  console.log('Data seeded successfully');
  process.exit(0);
})
.catch(err => {
  throw new Error(err);
});
