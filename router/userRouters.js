const {
  getUsers,
  getUserById,
  patchById,
  addUser,
  deleteUser,
  countUsers,
  getUsersByEmail,
} = require("../controllers/usersControllers");

const router = require("express").Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Obtiene la collection de usuarios completa
 *     responses:
 *       200:
 *        description: Usuarios obtenidos correctamente
 *
 */

router.get("/", getUsers);
router.get("/count", countUsers);
router.get("/search", getUsersByEmail);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene todos los usuario por si ID
 *     description: Obtiene un usuario especifico utilizando su ID
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del usuario a obtener.
 *           schema:
 *           type: string
 *     responses:
 *       200:
 *        description: Usuarios obtenidos correctamente
 *       404:
 *          description: Usuario no encotrado para el ID proporcionado.
 *
 */

router.get("/:id", getUserById);
router.patch("/:id", patchById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea nuevo usuario
 *     description: Crea un usuario con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nombre del usuario
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error en la solicitud. Verifique los datos.
 */

router.post("/", addUser);
router.delete("/:id", deleteUser);
module.exports = router;
