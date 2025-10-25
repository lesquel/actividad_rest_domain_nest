# API REST - Sistema de Reservas de Restaurantes

## 📋 Objetivo de la práctica

Desarrollar una API REST completa para el sistema **MesaYa** utilizando **NestJS** y **TypeORM**. Esta práctica implementa:

* CRUD completo para todas las entidades del sistema
* Documentación automática con Swagger/OpenAPI
* Validación de datos con DTOs y class-validator
* Arquitectura modular y escalable
* Integración con base de datos mediante TypeORM
* Sistema de seed para datos de prueba

Esta API proporciona todos los endpoints necesarios para gestionar restaurantes, reservas, menús, usuarios, pagos y suscripciones.

## 📋 Descripción

API REST completa para el sistema **MesaYa**, construida con **NestJS** y **TypeORM**. Esta API proporciona todos los endpoints necesarios para gestionar restaurantes, reservas, menús, usuarios, pagos y suscripciones.

### Características principales

* 🍽️ **Gestión de Restaurantes** - CRUD completo de restaurantes
* 👥 **Gestión de Usuarios** - Registro, autenticación y perfiles
* 🪑 **Gestión de Mesas y Secciones** - Control de distribución y disponibilidad
* 📅 **Sistema de Reservas** - Crear, consultar y gestionar reservas
* 📖 **Menús y Platillos** - Administración de ofertas gastronómicas
* 💳 **Sistema de Pagos** - Procesamiento de pagos de reservas y suscripciones
* ⭐ **Reseñas** - Sistema de calificaciones y comentarios
* 📸 **Gestión de Imágenes** - Almacenamiento y consulta de imágenes
* 💎 **Planes de Suscripción** - Diferentes niveles de membresía para restaurantes

## 🏗️ Arquitectura

El proyecto sigue la arquitectura de **NestJS** con separación en capas:

```
src/
├── modules/              # Módulos de dominio
│   ├── user/            # Gestión de usuarios
│   ├── restaurant/      # Gestión de restaurantes
│   ├── section/         # Secciones de restaurantes
│   ├── table/           # Mesas
│   ├── layout-object/   # Objetos de layout
│   ├── reservation/     # Reservas
│   ├── payment/         # Pagos
│   ├── menu/            # Menús
│   ├── dish/            # Platillos
│   ├── review/          # Reseñas
│   ├── image/           # Imágenes
│   ├── subscription/    # Suscripciones
│   ├── subscription-plan/ # Planes de suscripción
│   └── seed/            # Datos de prueba
├── domain/              # Entidades y lógica de negocio
├── application/         # Casos de uso
├── infrastructure/      # Configuración e implementaciones
├── common/              # Utilidades compartidas
└── types/               # Tipos TypeScript personalizados
```

## 🚀 Instalación

### Prerrequisitos

* Node.js 18+ instalado
* npm, yarn o pnpm

### Pasos de instalación

1. **Navegar al directorio del proyecto**

   ```powershell
   cd 1er-parcial/activities/act_4_rest
   ```

2. **Instalar dependencias**

   ```powershell
   npm install
   ```

## 💻 Ejecución

### Modo desarrollo

```powershell
# Iniciar en modo desarrollo con recarga automática
npm run start:dev
# o
npm run dev
```

La API estará disponible en `http://localhost:3000`

### Modo producción

```powershell
# Compilar el proyecto
npm run build

# Ejecutar en producción
npm run start:prod
```

### Otros comandos útiles

```powershell
# Modo desarrollo con debug
npm run start:debug

# Iniciar sin watch
npm start
```

## 📚 Documentación API

La API cuenta con **documentación interactiva Swagger** que se genera automáticamente.

### Acceder a la documentación

Una vez que la aplicación esté corriendo, visita:

```
http://localhost:3000/docs
```

En la documentación encontrarás:

* 📖 Todos los endpoints disponibles
* 📝 Esquemas de datos
* 🔐 Configuración de autenticación Bearer (JWT)
* ✅ Pruebas interactivas de endpoints
* 📊 Modelos de respuesta

### Archivos Swagger generados

El proyecto genera automáticamente:

* `swagger/swagger.json` - Especificación en formato JSON
* `swagger/swagger.yaml` - Especificación en formato YAML

## 🌐 Puerto y rutas principales

* **Puerto de desarrollo**: `3000`
* **Puerto de producción**: Configurable via variable `PORT`

### Rutas principales de prueba

```http
# Health check
GET http://localhost:3000/api/health

# Documentación interactiva
GET http://localhost:3000/docs

# Usuarios
GET http://localhost:3000/user
POST http://localhost:3000/user
GET http://localhost:3000/user/:id
PATCH http://localhost:3000/user/:id
DELETE http://localhost:3000/user/:id

# Restaurantes
GET http://localhost:3000/restaurant
POST http://localhost:3000/restaurant
GET http://localhost:3000/restaurant/:id

# Reservas
GET http://localhost:3000/reservation
POST http://localhost:3000/reservation
GET http://localhost:3000/reservation/:id

# Menús y platillos
GET http://localhost:3000/menu
GET http://localhost:3000/dish

# Más endpoints disponibles en /docs
```

## 🗄️ Base de datos

El proyecto utiliza **TypeORM** con **SQLite** por defecto.

### Configuración

La configuración de la base de datos se encuentra en:

```
src/infrastructure/config/typeorm.config.ts
```

### Seed de datos

Para poblar la base de datos con datos de prueba:

```powershell
# Ejecutar el seed desde el código
# (consultar módulo seed en src/modules/seed/)
```

## 🔐 Autenticación

La API utiliza **JWT (JSON Web Tokens)** para autenticación.

### Usar autenticación en Swagger

1. Obtén un token JWT del endpoint de login
2. Haz clic en el botón "Authorize" en Swagger
3. Ingresa el token con el formato: `Bearer <tu-token>`
4. Ahora puedes acceder a los endpoints protegidos

## 🛠️ Tecnologías utilizadas

* **NestJS** - Framework de Node.js progresivo
* **TypeORM** - ORM para TypeScript y JavaScript
* **SQLite** - Base de datos relacional
* **Swagger/OpenAPI** - Documentación de API
* **Class Validator** - Validación de DTOs
* **Class Transformer** - Transformación de objetos
* **TypeScript** - Lenguaje con tipado estático

## 📦 Módulos principales

### User (Usuarios)

Gestión de usuarios del sistema (clientes y dueños de restaurantes)

### Restaurant (Restaurantes)

CRUD de restaurantes con toda su información

### Section (Secciones)

Diferentes áreas dentro de un restaurante

### Table (Mesas)

Gestión de mesas disponibles y su distribución

### Reservation (Reservas)

Sistema completo de reservas con estados

### Payment (Pagos)

Procesamiento y registro de pagos

### Menu & Dish (Menús y Platillos)

Gestión de ofertas gastronómicas

### Review (Reseñas)

Sistema de calificaciones y comentarios

### Subscription & Subscription Plan

Planes de suscripción para restaurantes

## 🎨 Código limpio

```powershell
# Formatear código con Prettier
npm run format

# Ejecutar ESLint
npm run lint
```

## 📝 Variables de entorno

Puedes configurar las siguientes variables:

* `PORT` - Puerto del servidor (default: 3000)
* Configuraciones de base de datos
* Secretos JWT

## 🔮 Próximos pasos

* Implementar autenticación completa con JWT
* Añadir middleware de autorización por roles
* Integrar con servicios de pago externos
* Implementar caché con Redis
* Añadir rate limiting
* Configurar CORS adecuadamente

## 👨‍💻 Desarrollo

### Estructura de un módulo típico

```
module-name/
├── dto/              # Data Transfer Objects
├── entities/         # Entidades de TypeORM
├── module-name.controller.ts
├── module-name.service.ts
└── module-name.module.ts
```

### Crear un nuevo módulo

```powershell
nest generate module nombre-modulo
nest generate controller nombre-modulo
nest generate service nombre-modulo
```

## 📖 Recursos

* [Documentación de NestJS](https://docs.nestjs.com)
* [Documentación de TypeORM](https://typeorm.io)
* [Swagger/OpenAPI](https://swagger.io/specification/)

---

**Proyecto académico** - Aplicaciones para el servidor web | 5to semestre | ULEAM
