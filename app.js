/*
// importamos el modulo de express
const express = require("express");
// Importamos mongo
const mongoose = require("mongoose");
//declaramos el puerto donde se levantara el servidor
const PORT = 3000;

const userRouter = require("./router/userRouters");
const productsRouter = require("./router/productsRouter");
// asi inizializamos express y podemos eccede a todas las funcionalidades que nos proporciona
const app = express();

//analizamos los archivos JSON
app.use(express.json());

// ESTO NOS PERMITE OBTENER LA INFORMACION DE CONFIGURACION DE ".ENV"
require("dotenv").config();

const url_mongo = process.env.DATABASE_URL_DEV;

mongoose.connect(url_mongo);

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`Error al conectar con mongo ${error}`);
});

db.on("connected", () => {
  console.log(`Succecss connect`);
});

db.on("disconected", () => {
  console.log(`Mongo is disconected`);
});

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});*/

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 3000;

// IMPORTAMOS LOS ROUTERS
const userRouter = require("./router/userRouters");
const productsRouter = require("./router/productsRouter"); // CORREGIDO ✅
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("./swagger/swaggerConfig");

const app = express();
app.use(express.json()); // Middleware para parsear JSON

const url_mongo = process.env.DATABASE_URL_DEV;

mongoose.connect(url_mongo);
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`Error al conectar con mongo ${error}`);
});

db.on("connected", () => {
  console.log(`MongoDB conectado exitosamente`);
});

db.on("disconnected", () => {
  console.log(`MongoDB desconectado`);
});

// RUTAS
app.use("/users", userRouter);
app.use("/products", productsRouter); // ← ESTO FALTABA
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));

// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
