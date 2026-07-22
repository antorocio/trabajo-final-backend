# 📋 Senda API

Pensé en Senda como nombre de una API REST que gestiona las tareas de los empleados de una tienda de productos holísticos "Alquimia".
Está desarrollada con Node.js, Express y MongoDB.
Es un proyecto desarrollado con fines educativos, que fueron siguiendo las explicaciones durante las clases del curso de Backend Developer.

## 🚀 Características

- Registro e inicio de sesión con JWT.
- Autenticación mediante Bearer Token.
- Autorización basada en roles (`user` y `admin`).
- CRUD completo de tareas.
- Validación de datos con Zod.
- Búsqueda, filtros, ordenamiento y paginación.
- Rate Limiter para proteger el login.
- Arquitectura MVC.

---

## 🛠️ Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Zod
- bcryptjs
- express-rate-limit
- dotenv

---

## 📁 Estructura del proyecto
```text

├── src
│   ├── config
│   │   └── mongoDB.js
│   │
│   ├── controllers
│   │   ├── authControllers.js
│   │   └── taskControllers.js
│   │
│   ├── middlewares
│   │   ├── authMiddleware.js
│   │   ├── limiterMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── validateMiddleware.js
│   │
│   ├── models
│   │   ├── TaskModel.js
│   │   └── UserModel.js
│   │
│   ├── routes
│   │   ├── authRouter.js
│   │   └── taskRouter.js
│   │
│   ├── validators
│   │   ├── TaskValidators.js
│   │   └── UserValidators.js
│   │
│   ├── app.js
│   └── server.js
│
└── .env.example
```

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone https://github.com/antorocio/trabajo-final-backend
```

Entrar al proyecto:

```bash
cd trabajo-final-backend
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env`:

``seguir como plantilla el archivo .env.example ``

Iniciar el servidor:

```bash
npm run dev
```

---

## 🔐 Autenticación

Después de iniciar sesión, enviar el token en cada petición protegida:

```http
Authorization: Bearer *token*
```

---
## 👥 Roles

- **User:** administra únicamente sus propias tareas.
- **Admin:** además puede visualizar y eliminar las tareas de cualquier usuario.

---

## 📌 Endpoints

### Auth

 POST | `/api/auth/register` | Registrar usuario 

 POST | `/api/auth/login` | Iniciar sesión 

### Tasks

 GET | `/api/tasks` | Obtener mis tareas 

 GET | `/api/tasks/:id` | Obtener una tarea por ID 

 POST | `/api/tasks` | Crear una tarea 

 PUT | `/api/tasks/:id` | Actualizar una tarea 

 DELETE | `/api/tasks/:id` | Eliminar una tarea 

### Admin

Para utilizar los endpoints de administrador:

1. Modificar el rol de un usuario existente en MongoDB:


{
  "role": "admin"
}

2. Iniciar sesión nuevamente para generar un JWT con el nuevo rol.

 GET | `/api/tasks/admin/all` | Obtener todas las tareas 

 DELETE | `/api/tasks/admin/:id` | Eliminar cualquier tarea 

---

## 🔎 Query Params

El endpoint:

```http
GET /api/tasks
```

Acepta los siguientes parámetros:

- status : Filtrar por estado 
- priority : Filtrar por prioridad 
- search : Buscar por título o descripción 
- sort : Ordenar resultados 
- page : Número de página 
- limit : Cantidad de resultados por página 

Ejemplo:

```http
GET /api/tasks?status=pending&priority=high&page=1&limit=5
```

--- 
## 📄 Ejemplos de datos

En la carpeta `docs` se incluyen ejemplos de cuerpos (`body`) para facilitar las pruebas de la API.

```text
docs/
├── tasks-examples.json
└── user-example.json
```

Estos archivos pueden utilizarse directamente en Bruno para probar los endpoints de registro y creación de tareas.

---
## 🧪 Colección de Bruno

El proyecto incluye una colección de **Bruno** con todos los endpoints necesarios para probar la API.

Ubicación:

```text
/bruno/Backend UTN
```


Para utilizarla:

1. Abrir Bruno.
2. Seleccionar **Open Collection**.
3. Elegir la carpeta `bruno/Backend UTN`.
4. Configurar la URL base de la API y el token JWT para las rutas protegidas.