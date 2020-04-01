# Ejercicios
# 07 - Query definition

## Implementación de los queries

Ahora que tenemos la _definición_ de nuesto API, haremos la _implementación_ de éste. Para responder un query necesitamos de una función que lo responda, es decir, un _resolver_

Para esto, crearemos un archivo con los resolvers a los dos queries que especificamos.

### Resolver: courses

```
import Course from '../models/Course';

const Query = {
  courses: () => {
    return Course.find();
  }
}
```

Sencillo!

### Resolver: student

En el mismo archivo podemos implementar el resolver de la petición de `student`.
Recordemos que en la definición del query requerimos un parámetro para poder regresar el usuario correspondiente al id que le pasemos

```
import 'User' from '../models/User';

const Query = {
  ...,

  student: (_, { id }) => {
    return User.findOne({ _id: id });
  }
}
```
