# SETUP
# 02 - Herramientas de desarrollo

## Herramientas de desarrollo

Antes de continuar, vamos a inicializar algunas configuraciones adicionales en nuestro proyecto

### Babel

Babel es una herramienta que nos permite escribir javascript usando el último estándar ECMAscript 6, así como adiciones al lenguaje tales como GrapQL y JSX (sintaxis especial usada en React).

Para instalar Babel y las librerías auxiliares debemos de instalar los siguientes módulos

```
 npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
```

<details>
  <summary><i>¿Qué hace el parámetro <code>--save-dev</code></i></summary> 
  <br />
  Este parámetro indica que instalaremos este paquete sólo en nuestro ambiente de desarrollo, pero babel no es necesario en el código final ya que se asume que hay un paso de compilación previo donde el código _transpilado_ se usa en vez del original.
</details>
<br />

También debemos de indicarle a babel los _presets_ que usaremos para nuestro proyecto. En el caso de nuesto proyecto, Babel provee un plugin que soporta ECMAscript 6 de manera inteligente, evitando que tengamos que instalar múltiples plugins y proveyendo un default completo de inicio. Escribiremos un archivo llamado `babelrc` con la siguiente configuración:

```javascript
{
  "presets": ["@babel/preset-env"]
}
```

Esta configuración nos permite, de entrada, poder utilizar `import` en vez de `require` en nuestro código, por lo que podemos cambiar la sintaxis en nuestro archivo original por:

```javascript
import express from 'express';

```

<details>
  <summary><i>¿Cuáles son las diferencias entre <code>require</code> e <code>import</code>?</i></summary> 
  <br />
  <code>import</code> (y <code>export</code>) son funcionalidades de los <b>módulos</b> de ECMAscript 6, que tienen más funcionalidades tales como múltiples exports, y la habilidad de importar sólo partes de un módulo.


  **Referencias**: [ES6 modules](https://exploringjs.com/es6/ch_modules.html)
</details>
<br />

### Nodemon

Para poder correr nuestro proyecto, tendríamos que compilar Babel cada vez antes de ejecutarlo. Por fortuna, podemos utilizar una herramienta conocida como `nodemon`, que no sólo nos permite monitorear cambios en nuestra aplicación para reiniciar y cargar cambios automáticamente, sino para correr este paso de compilación.

Para esto, primero necesitamos instalar `nodemon`

```
npm install --save-dev nodemon
```

Y necesitaremos especificar la configuración de lo que queremos que `nodemon` corra en nuestro proyecto. Para esto crearemos un archivo `nodemon.json` con el siguiente contenido

```javascript
{
  "verbose": false,
  "ignore": ["node_modules"],
  "env": {
    "NODE_ENV": "development",
    "BABEL_DISABLE_CACHE": 1
  },
  "execMap": {
    "js": "babel-node"
  },
  "ext": ".js,.json,.graphql,.gql",
  "watch": "./src/**/*"
}
```

Esta configuración nos permite correr los archivos `js` usando `babel-node` en vez de `node`.

### Package scripts

El último paso es crear los comandos en el archivo `package.json` para correr nuestro proyecto, en la sección de `scripts`

```javascript
"dev": "nodemon src/index.js"
```

Así como los comandos para compilar nuestro proyecto en un ambiente de producción (que usaremos después)

```javascript
"start": "node ./__build__",
"build": "babel ./src -d ./__build__ -D -s"
```

