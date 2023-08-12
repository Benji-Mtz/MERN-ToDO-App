# Proyecto de aplicación de tareas

## Primeros pasos

Una vez descargado el proyecto ejecutaremos los siguientes pasos:

```sh
cd MERN-ToDO-App
(MERN-ToDO-App): npm install
(MERN-ToDO-App): cd frontend
(MERN-ToDO-App/frontend): npm install
(MERN-ToDO-App/frontend): cd ..
(MERN-ToDO-App)
```
Es decir tendremos que instalar las dependencias para la aplicación de backend y la aplicación de frontend.

Al entrar a la raíz del proyecto estaremos ya en el backend por esa razón se ejecuta `npm install` que contiene las dependecias para ejecución del backend como de la aplicacion global.

Por otra parte, debemos entrar a la carpeta frontend y ejecutar `npm install` para que se instalen los paquetes que se necesitaran al momento de lanzar la aplicación.

## Archivos .env

Antes de ejecutar el comando que nos permitira lanzar nuestro backend y frontend debemos crear un archivo .env para cada aplicación.

Es decir un archivo ``.env`` dentro de la carpeta `MERN-ToDO-App` con una linea como esta:

```sh
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.7ezujw2.mongodb.net/<collection_name>?retryWrites=true&w=majority
```

Y un archivo ``.env`` dentro de la carpeta `frontend` con una linea como esta:

```sh
VITE_SERVER_URL=http://localhost:5000
```

Los datos especificos de la URL de conexion a MongoDB Atlas se me la pueden solicitar, esto con fines de seguridad, la veriable de entorno del frontend es esa misma.

## Ejecución del proyecto

Una vez tengamos todos los pasos anteriores podemos ejecutar el proyecto completo desde la terminal en la ubicacion `MERN-ToDO-App` de esta manera:

```sh
(MERN-ToDO-App): npm run mern
```

Ahora estara lista nuestra aplicación para probar. Al estar usando React con Vite, nos daran una url como: `http://127.0.0.1:5173/` pero también será valido usar `http://localhost:5173/` en nuestro navegador de preferencia.

