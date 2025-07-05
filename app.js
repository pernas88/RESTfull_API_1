// importamos el modulo de express
const express = require("express");
//declaramos el puerto donde se levantara el servidor
const PORT = 3000;

// asi inizializamos express y podemos eccede a todas las funcionalidades que nos proporciona
const app = express();

//analizamos los archivos JSON
app.use(express.json());

const users = require("./controllers/usersControllers");
app.use("/users", users);

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
