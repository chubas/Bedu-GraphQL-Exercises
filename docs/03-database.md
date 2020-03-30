# SETUP
# 03 - Mongo

## MongoDB

Para este proyecto, utilizaremos MongoDB como nuestra base de datos. MongoDB es una base de datos **no-relacional**, que nos permite tener flexibilidad sobre la definición de nuestros esquemas, además de ser naturalmente más fácil de manejar utilizando javascript por su uso de objetos `json`.

<details>
  <summary><i>¿Por qué se utiliza MongoDB? ¿Cuáles son las diferencias con otras bases de datos?</i></summary> 
  <br />
  Las bases de datos relacionales y no relacionales tienen diferencias fundamentales, pero en general pueden ser utilizadas por igual, ofreciendo algunas ventajas una sobre la otra.

  La decisión de qué base de datos usar para proyectos grandes debe de hacerse basada en varios factores, como lo son la naturaleza misma de los datos, el soporte de infraestructura, la cantidad y velocidad de recolección de datos, etc. 

  Para propósitos del curso, utilizaremos MongoDB ya que la flexibilidad de la definición de los <i>documentos</i> nos permite poder agregar o cambiar campos más fácilmente, además de que las librerías para trabajar con mongo son más sencillas de usar con javascript

  <b>Referencia</b>: [Diferencia entre SQL vs NoSQL](https://www.xplenty.com/blog/the-sql-vs-nosql-difference/)
</details>
<br />

Para usar mongo tenemos dos opciones:

### Opción 1: Instalación local

Podemos utilizar una base de datos local en nuestro sistema. Para esto, debemos primero de instalar mongodb y asegurarnos de que está corriendo en nuestro sistema.

Para instalar MongoDB en tu sistema, refiere a las [instrucciones de instalación](https://docs.mongodb.com/manual/installation/) dependiendo en el sistema operativo que te encuentres.

Al finalizar la instalación, debes de correr el servicio de `mongod`, es decir, correr el servidor de mongo para aceptar conexiones de clientes. Puedes verificar que este está corriendo ejecutando el comando en terminal

```
mongo
```

el cual debe de inicializar exitosamente una consola.

### Opción 2: Usar base de datos remota

También tenemos la opción de utilizar una base de datos en la nube, lo que podemos obtener de manera gratuita (hasta cierto límite de uso) usando MongoDB Atlas.

Para usar una base de datos en la nube, refiere a las [instrucciones de creación de una base de datos en Atlas](https://docs.atlas.mongodb.com/getting-started/)

## Mongoose

En nuestro proyecto utilizaremos la librería de Mongoose que nos permite conectarnos a nuestra base de datos desde javascript. Para esto instalaremos

```
npm install --save mongoose
```

### Configuración

En nuestra aplicación necesitamos indicar dónde se encuentra nuestra base de datos, a través de una URL.

Si instalamos MongoDB localmente, la URL se verá de esta forma

```
mongodb://localhost:27017/myapp
```

donde `myapp` es el nombre de nuestra base de datos, y asumiendo que la instalación usa el usuario default sin password.

Si decides usar Atlas, la conexión se verá de la forma

```
mongodb+srv://<user>:<password>@<clustername>.mongodb.net/test?retryWrites=true&w=majority
```

Puedes obtener esta información desde la sección de **Connect** en el panel de configuración de Atlas

## Variables de ambiente

Para poder incluir los datos de conexión, usaremos una variable de ambiente con la variable `APP_MONGO_URI`. Para poder hacer más fácil definir nuestras variables de ambiente y leerlas de un archivo llamado `.env`, debemos instalar la librería `dotenv`

```
npm install --save dotenv
```

En este archivo `.env` definiremos nuestra conexión a MongoDB de acuerdo a la configuración mencionada antes

```
APP_MONGO_URI=<conection-string>
```

Y agregaremos a nuestro archivo de servidor

```
import 'dotenv/config';

const APP_MONGO_URI = process.env.APP_MONGO_URI;
if (!APP_MONGO_URI) {
  throw 'Variable APP_MONGO_URI is not defined';
}
```

## Inicialización

Para probar la conexión exitosa, haremos esta conexión antes de iniciar nuestro servidor

```
import mongoose from 'mongoose';
```

```
mongoose.connect(APP_MONGO_URI, { useNewUrlParser: true }).then(() => {
  console.log('Connected to MongoDB');
  app.listen(8080, () => {
    console.log('Express server listening at localhost:8080');
  });
});
```

Y deberíamos de poder inicializar el servidor si ningún problema.

