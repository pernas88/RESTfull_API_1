let USERS = [
  { id: 1, name: "Usuario 1", email: "usuario1@example.com" },
  { id: 2, name: "Usuario 2", email: "usuario2@example.com" },
  { id: 3, name: "Usuario 3", email: "usuario3@example.com" },
];

const getUsers = (req, res) => {
  res.send(USERS);
};

const getUserById = (req, res) => {
  // convertimos el id de la url en un entero
  const userId = parseInt(req.params.id);
  // buscamos en el array por el valor que queremos buscar, este caso id
  const user = USERS.find((user) => user.id === userId);
  res.send(USERS);
};

const patchById = (req, res) => {
  // Convertimos el id de la URL en un entero
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  //Buscamos en el array por el valor que queremos buscar, en este caso por id
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
};

const addUser = (req, res) => {
  const { name, email } = req.body;
  const newIndex = USERS.length + 1;

  const newUser = {
    id: newIndex,
    name: name,
    email: email,
  };

  USERS.push(newUser);

  res.send(newUser);
};

const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);

  const filteredUsers = USERS.filter((user) => user.id !== userId);

  if (filteredUsers.length === USERS.length) {
    res.send("El usuario no existe");
  } else {
    USERS = filteredUsers;
    res.send(filteredUsers);
  }
};

module.exports = { getUsers, getUserById, patchById, addUser, deleteUser };
