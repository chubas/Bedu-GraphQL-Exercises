# SETUP
# 04 - GraphQL

## GraphQL

En nuestro proyecto usaremos GraphQL, que es un lenguaje que nos permite hacer APIs de una manera más flexible que la metodología REST, y que como hemos visto, es independiente de la base de datos y de su implementación del lado de nuestro servidor.

<details>
  <summary><i>¿Qué diferencias tiene GraphQL sobre APIs REST?</i></summary> 
  <br />
  GraphQL nació debido a la complejidad inherente de manejar modelos de datos complejos en aplicaciones web modernas, resolviendo problemas como la necesidad de múltiples peticiones, flexibilidad para soportar diversos clientes, y la separación de cómo definimos los datos vs cómo se consumen.
  <b>Referencia</b>: [Diferencias entre GrapQL y REST](https://blog.apollographql.com/graphql-vs-rest-5d425123e34b)
</details>
<br />

Para soportar GraphQL necesitamos instalar el módulo de GraphQL, así como el plugin de babel que nos permite insertar archivos en el formato `gql` o `graphql` sin tener que compilarlos manualmente.

```
npm install --save graphql
npm install --save-dev babel-plugin-import-graphql

```

En nuestro archivo de `.babelrc` agregamos el plugin requerido, por lo cual nuestra configuración lucirá

```javascript
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    "import-graphql"
  ]
}
```

## Apollo

Apollo es el componente del lado de servidor que responderá a nuestras peticiones de GraphQL. Para instalarlo, haremos

```
npm install --save apollo-server-express
```

## GraphQL Playground

Para poder usar GraphQL necesitamos algo del lado del cliente que responda a las peticiones de GraphQL. Para propósitos de desarrollo, usaremos una utilería conocida como _playground_ que nos permitirá hacer queries y ver su resultado.

```
npm install --save graphql-playground-middleware-express
```

## Uniendo Apollo en nuestra aplicación

Tanto el servidor como el playground vienen en la forma de un middleground de Express, por lo que debemos de agregarlo en nuestra aplicación.

Para inicializar el servidor de Apollo, agregaremos a nuestro index

```javascript
import { ApolloServer, gql } from 'apollo-server-express';
```

y lo uniremos con nuestra `app` de Express haciendo lo siguiente

```javascript
const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      test: String
    }
  `,
  resolvers: []
});
server.applyMiddleware({ app });
```

> Nota que aquí estamos usando una función `gql` que permite definir queries de GraphQL en línea en nuestro código, y estamos agregando un query `test` que es el mínimo necesario para que nuestro servidor funcione. Esto lo reemplazaremos pronto por la definición de nuestros Queries verdaderos

Para implementar el playground, tenemos que requerir el middleware

```javascript
import ExpressPlayground from 'graphql-playground-middleware-express';
```

y definir el endpoint que va a responder a él, así como el endpoint donde responderá el API de Apollo

```javascript
app.get('/playground', ExpressPlayground({ endpoint: '/graphql' }));
```

De haberlo hecho correctamente, podremos ir a nuestra aplicación en la ruta `/playground`, en la cual debemos de ver el playground, y podemos hacer un query básico

```graphql
{
  test
}
```

el cual nos debe responder correctamente, aunque con una respuesta en `null` dado que no hemos implementado ningún resolver aún

<details>
  <summary><i>¿Por qué usamos Apollo?</i></summary> 
  <br />
  En el mundo de GraphQL, así como del mundo del web development en general, existen muchas opciones, y cada librería tiene sus ventajas. Apollo es una de las librerías de GraphQL más utilizadas, tiene cientos de plugins y librerías open source, y es usada en producción por grandes empresas. Para saber más sobre esta librería visita esta [página comparativa](https://www.robinwieruch.de/why-apollo-advantages-disadvantages-alternatives).
</details>
<br />