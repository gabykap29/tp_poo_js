# Trabajo Práctico de TPL 4: Backend de E-Commerce

## Descripción

Este proyecto es el trabajo práctico de la materia TPL 4, en el cual se desarrolló el backend de una aplicación de e-commerce utilizando **Express.js** y **MongoDB**. El proyecto sigue un enfoque de programación orientada a objetos (POO) para estructurar la lógica de negocio, lo que permite un código más modular y mantenible.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el backend.
- **Express.js**: Framework web para Node.js que facilita la creación de aplicaciones web y APIs.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar la información del e-commerce.
- **Mongoose**: Librería para modelar datos en MongoDB con objetos de JavaScript.
- **POO (Programación Orientada a Objetos)**: Paradigma de programación utilizado para estructurar el código.

## Funcionalidades Principales

- **Gestión de Usuarios**: CRUD de usuarios, incluyendo registro, autenticación, y perfil.
- **Gestión de Productos**: CRUD de productos, incluyendo categorías, precios, y stock.
- **Gestión de Compras**: Procesamiento de compras y generación de órdenes.
- **Gestión de Ventas**: Registro y seguimiento de ventas realizadas.
- **Carrito de Compras**: Gestión del carrito de compras para los usuarios.

## Estructura del Proyecto

```bash
├── config
│   └── config.js
├── controllers
│   ├── userController.js
│   ├── productController.js
│   ├── salesController.js
│   └── cartControllers.js
├── db
│   ├── database.js
├── models
│   ├── SchemasValidator
│   │   ├── userSchemaValidator.js
│   │   ├── productSchemaValidator.js
│   │   ├── salesSchemaValidator.js
│   │   └── CartSchemas.js
│   ├── userModel.js
│   ├── productModel.js
│   ├── salesModel.js
│   └── CartModel.js
├── services
│   ├── userService.js
│   ├── productService.js
│   ├── salesService.js
│   └── cartService.js
│   |__ AuthService.js
├── routes
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── salesRoutes.js
│   └── cartRoutes.js
└── index.js


- **controllers/**: Contiene los controladores que manejan las solicitudes HTTP y responden con los datos apropiados.
- **models/**: Define los esquemas de MongoDB utilizando Mongoose.
- **services/**: Implementa la lógica de negocio para manejar las operaciones de cada módulo (Usuarios, Productos, Ventas).
- **routes/**: Define las rutas de la API que son manejadas por los controladores correspondientes.
- **app.js**: Punto de entrada de la aplicación, donde se configura el servidor Express.

## Instalación y Ejecución

### Requisitos Previos

- Node.js (v14 o superior)
- MongoDB

### Pasos para Ejecutar el Proyecto

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/tpl4-ecommerce-backend.git
    cd tpl4-ecommerce-backend
    ```

2. Instalar las dependencias:

    ```bash
    npm install
    ```

3. Configurar las variables de entorno: Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

    ```env
    MONGODB_URI=mongodb://localhost:27017/tpl4-ecommerce
    PORT=3000
    ```

4. Iniciar el servidor:

    ```bash
    npm start
    ```

    El servidor se ejecutará en `http://localhost:3000`.

