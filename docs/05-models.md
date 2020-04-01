# Ejercicios
# 05 - Definición de nuestros modelos

## Definición del problema

Para este ejercicio, vamos a hacer una aplicación que nos permita registrar alumnos, cursos, y realizar "inscripciones" para relacionarlos.

## Modelos

Para nuestro ejercicio, comenzaremos por definir los modelos en Mongoose, dentro del directorio `src/models`

### Cursos
`Course.js`
```javascript
import mongoose, { Schema } from 'mongoose';

const CourseSchema = new Schema({
  firstName: String,
  description: String,
  category: String,
  startDate: Date,
  endDate: Date
}, {
  timestamps: true,
});

const CourseModel = mongoose.model('Course', CourseSchema);
export { CourseSchema, CourseModel as Course };
```

### Usuarios
`User.js`
```javascript
import mongoose, { Schema } from 'mongoose';
import { CourseSchema } from './Course'

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  birthDate: String,
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
}, {
  timestamps: true,
});

const UserModel = mongoose.model('User', UserSchema);
export { UserSchema, UserModel as User };
```

> NOTA: Observa cómo definimos que un usuario tiene una lista de cursos usando un arreglo, y definiendo el tipo como una referencia `mongoose.Schema.Types.ObjectId`. Esto nos permite usar el API de mongoose para obtener los objetos de otro modelo relacionados por su id.

<details>
  <summary><i>¿Qué significa el `as` en la declaración del export?</i></summary> 
  <br />
  ES6 nos permite definir el nombre con el que queremos exportar algo dentro de un módulo usando un _alias_. En este caso, como generalmente usaremos los modelos usando su nombre (por ejemplo, <code>User</code>, el exportar <code>UserModel</code> es redundante.
</details>
<br />

## Seeds

En el desarrollo existe el concepto de `seed data` o datos semilla, que nos sirven para poblar nuestra base de datos con contenido inicial, ya sea para desarrollo o pruebas. Para eso, vamos a crear un archivo que nos permita limpiar los datos existentes, y definir y cargar esos datos iniciales.

Para esto vamos a crear un directorio llamado `scripts` y dentro de él un archivo llamado `seed.js`, con el código siguiente para cargar datos:

`scripts/seed.js`
```javascript
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

```

> NOTA: Mongoose convierte automáticamente las fechas de un String a un tipo fecha porque definimos el campo como tipo `Date`. A esto es lo que se llama como un _type casting_, y mongoose incluye varios casting de tipos como este por default. En caso de no poder convertirlo, levantará una excepción.

Para llamar nuestro script crearemos un comando en nuestro `package.json`

```javascript
  "seed": "babel-node scripts/seed.js"
```

Al correr nuestro script con `npm run seed` obtendremos datos recién creados que podemos usar como ejemplo. Puedes experimentar cambiando los datos iniciales, agregando o modificando registros.