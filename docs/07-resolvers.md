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
    return Course.find().exec();
  }
}
```

<details>
  <summary><i>¿Qué hace el método <code>find</code>, y quién lo define?</i></summary> 
  <br />
  El método <code>find</code> es parte del API de Mongoose (https://mongoosejs.com/docs/queries.html) el cual define operaciones hacia nuestra base de datos, tanto de consulta como en este caso, así como de modificación o borrado.
  En su forma más sencilla, <code>find</code> va a encontrar <i>todos</i> los documentos de nuestra base de datos (lo que generalmente no es recomendable, sino que más adelante tendremos que implementar filtros y paginación!)
</details>
<br />

<details>
  <summary><i>¿Qué es el método <code>exec</code>?</i></summary> 
  <br />
  Los queries en mongo son <i>concatenables</i>, es decir, podemos definir un query en secciones agregando filtros o modificadores por separado (por ejemplo, <code>User.find().</code>)
</details>
<br />

Sencillo!

### Resolver: student

En el mismo archivo podemos implementar el resolver de la petición de `student`.
Recordemos que en la definición del query requerimos un parámetro para poder regresar el usuario correspondiente al id que le pasemos

```
import 'User' from '../models/User';

const Query = {
  ...,

  student: (_, { id }) => {
    return User.findOne({ _id: id }).exec();
  }
}
```
