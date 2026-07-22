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

### Usuario

- Registrar una cuenta.
- Iniciar sesión.
- Crear tareas.
- Ver únicamente sus tareas.
- Editar sus tareas.
- Eliminar sus tareas.

### Administrador

Además de las funciones del usuario:

- Ver todas las tareas.
- Eliminar cualquier tarea.

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