const router = require("express").Router();

let USERS = [
  { id: 1, name: "Usuario 1", email: "usuario1@example.com" },
  { id: 2, name: "Usuario 2", email: "usuario2@example.com" },
  { id: 3, name: "Usuario 3", email: "usuario3@example.com" },
];

// metodo get para obtener toda la coleccion users
router.get("/", (req, res) => {
  res.send(USERS);
});

// metodo get para obtener un unico usuario
router.get("/:id", (req, res) => {
  // convertimos el id de la url en un entero
  const userId = parseInt(req.params.id);
  // buscamos en el array por el valor que queremos buscar, este caso id
  const user = USERS.find((user) => user.id === userId);
  res.send(user);
});

// metodo patch para obtener un unico usuario
router.patch("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = USERS.find((user) => user.id === userId);

  if (!user) {
    res.send("el usuario no existe");
  }
  if (name) {
    user.name = req.body.name;
  }

  if (email) {
    user.email = req.body.email;
  }
  res.send(user);
});

// res.send(
// `Soy Update (ACTUALIZAR) ${req.params.id} -  ${JSON.stringify(req.body)}`
//);

// metodo post para obtener un unico usuario
router.post("/", (req, res) => {
  res.send(`Soy POST(CREAR)  ${JSON.stringify(req.body)}`);
});

// metodo DELETE para obtener un unico usuario
router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const filteredUsers = USERS.filter((user) => user.id !== userId);

  if (filteredUsers.length === USERS.length) {
    res.send("El usuario no existe");
  } else {
    USERS = filteredUsers;
    res.send(filteredUsers);
  }
});

module.exports = router;
