# Ejercicios
# 06 - Schema y Queries

## Elementos de GraphQL

Una vez que tenemos los modelos definidos, debemos definir los elementos de GraphQL para poder accederlos.

Como recordamos, GraphQL requiere que definamos los queries y los resolvers. Pero antes debemos de definir qué API queremos hacer

### Definición del problema

En nuestra aplicación contaremos con una sección que nos permite ver el calendario de cursos, por lo cual necesitaremos los detalles del curso como nombre, descripción, categoría, fechas de inicio y fin.

También nuestra aplicación contará con una página donde podremos ver el detalle individual de cada usuario (por ahora sin autenticación, eso lo introduciremos más tarde), con sus datos principales como nombre completo, email y fecha de nacimiento, así como el nombre y categoría del curso

## Schema

El schema se compone de los queries y los resolvers. Para esto, crearemos un directorio llamado `src/schema` y definiremos nuestros Queries principales: Una lista de cursos, y una lista de usuarios con sus cursos asociados.

### Tipos

Primero definiremos los tipos de datos que conforman nuestro schema, que son los datos que deseamos obtener tanto de nuestros cursos como de los usuarios.

```graphql
type Course {
  _id: String,
  name: String,
  description: String,  
  category: String,
  startsOn: String,
  endsOn: String
}

type User {
  _id: String,
  firstName: String!,
  lastName: String!
  email: String!,
  birthDate: String!,
  courses: [Course]!
}
```

<details>
  <summary><i>¿Qué es el campo _id?</i></summary> 
  <br />
  Nuestros usuarios tendrán un campo `_id`, el cual es agregado por default por Mongo y es el un string hexadecimal usuaro como identificador.
</details>
<br />

<details>
  <summary><i>¿Por qué los campos de fecha están definidos como String?</i></summary> 
  <br />
  GraphQL, al ser sólo una especificación de cómo pedir y mandar información, tiene muy pocos tipos de datos, y deja la implementación a la librería que se encargue de producir y consumir esos datos. Por lo tal, no tiene un tipo Date o Timestamp, sino que la labor de convertir esa información corresponde en este caso a Apollo, que ejecuta el <i>casting</i> o conversión de tipos automáticamente.
</details>
<br />

### Queries

Primero definiremos el query de cursos, que nos trae una lista completa.

```
type Query {
  courses: [Course]
}
```

Para el query de estudiantes (nuestro modelo de User), de acuerdo a la definición de nuestro problema necesitaremos pasar un id que nos regrese un usuario en particular

```
type Query {
  courses:...
  student(id: String!): User
}
```

<details>
  <summary><i>¿Por qué no definimos los campos de cada tipo directamente, en vez de usar tipos?</i></summary> 
  <br />
  Si bien podríamos definir la respuesta directamente, es conveniente definir tipos en nuestros queries para poder utilizarlos en otros queries, por ejemplo si quisiéramos obtener el detalle individual de un curso, o una lista de alumnos.
  Una de las ventajas de usar tipos en GraphQL es que nos ayudan a definir la respuesta posible de nuestro API, aunque los campos específicos son definidos por el cliente.
</details>
<br />


Ahora sólo nos falta unir nuestro esquema con la aplicación. Para esto, exportaremos nuestras definiciones y las usaremos en nuestro servidor. Definiremos un `index.js` en el directorio `schema` que exponga nuestras definiciones a la aplicación.

`schema/index.js`
```
import Types from './types.graphql';
import Query from './query.graphql';

export default [Types, Query];
```

y en nuestro server

`index.js`
```
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: []
});
```

<details>
  <summary><i>¿Por qué importamos los archivos <code>.graphql</code>?</i></summary> 
  <br />
  Gracias a Babel, podemos importar archivos de tipo `graphql` ya que estos son automáticamente compilados al código javascript que Apollo necesita.
</details>
<br />

Si hemos hecho esto correctamente, podremos ver nuestro esquema en el playground, y deberíamos de ser capaces de ejecutar queries, por ejemplo: 

```
{
  courses {
    name
  }
}
```
o 
```
{
  student(id: '123')
}
```

aunque la respuesta el `null`, puesto que no hemos definido los resolvers.
