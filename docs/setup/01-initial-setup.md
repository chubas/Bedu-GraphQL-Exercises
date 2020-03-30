# SETUP
# 01 - Creación del proyecto Express

## Creación del proyecto

Para comenzar, vamos a crear una aplicación de npm corriendo el siguiente comando

```
npm init
```

<details>
  <summary><i>¿Qué es <code>npm</code> y para qué sirve el comando <code>npm init</code>?</i></summary> 
  <br />
  NPM son las iniciales de <code>Node Package Manager</code>, y nuestros proyectos de node son creados y manejados como paquetes. <code>npm init</code> es la manera de crear un nuevo proyecto de node, el cual nos genera un archivo `package.json` que tiene la información de nuestro proyecto
</details>
<br />

Una vez inicializada la aplicación, tenemos que instalar los paquetes fundamentales. Comenzaremos por instalar exprés que es la base de nuestro proyecto.

```
npm install --save express 
```

<details>
  <summary><i>¿Qué hace el comando `npm install`? ¿Para qué sirve la opción `--install`?</i></summary> 
  <br />
  <code>npm install</code> nos permite instalar un módulo existente dentro de nuestro directorio <code>node_modules</code> que es donde se guardan éstos. La opción <code>--save</code> se encarga de también agregarlo a nuestro archivo <code>package.json</code> automáticamente, de modo contrario el paquete se instalaría localmente, pero en un servidor remoto este no se instalaría.
</details>
<br />

## Creación de un servidor básico

Una vez que tenemos instalado express, comenzaremos por crear un servidor básico de express. Crearemos un directorio `/src` y dentro de él, un archivo `index.js` con el siguiente contenido 

```
'use strict';

const express = require('express');

const app = express();

// Route handler for root path
app.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});

app.listen(8080, () => {
  console.log('Express server listening at localhost:8080');
});
```

Puedes iniciar el servidor ejecutando `node src/index.js`. De haberlo hecho correctamente, entrando a la dirección `http://localhost:8080/` en tu navegador, deberías de poder ver el mensaje `Hello world!`

<details>
  <summary><i>¿Qué es lo que hace el bloque <code>app.get(...)</code>?</i></summary> 
  <br />
  <code>app.get</code> es un middleware default de Express, define una ruta que podemos acceder a través de <code>/</code> (es decir, la ruta default), y prepara una respuesta simple, en este caso un mensaje junto con un código de respuesta.


  **Referencias:** [Express routing](https://expressjs.com/en/guide/routing.html)
</details>
<br />

<details>
  <summary><i>¿Cómo funcionan los middlewares en express?</i></summary> 
  <br />
  Un middleware, en su definición más sencilla, es una función que funciona como un filtro en cómo se procesa una petición. Los argumentos que recibe son un objeto con la petición (<code>req</code>) y un objeto con la respuesta (<code>res</code>), así como un tercer parámetro que nos permite continuar la ejecución a otros middlewares si este fuera el caso.


  **Referencias** [Documentación oficial](https://expressjs.com/en/guide/using-middleware.html)
</details>
<br />
