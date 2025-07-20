const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Correo incorrecto"],
  },
});
/*  

^: INDICA EL INICIO DE LA CADENA.
\S+: COINCIDE CON UNO O MAS CARACTERES QUE NO SEAN  UN ESPACIO EN BLANCO EN ESTE CASO ARROBA.
@: BUSCA EL CARACTER @
\S+: SIMILIAR AL PRIMERO BUSCA UNO O MAS CARACTERES QUE NO SEAN UN ESPACIO EN BLANCO DESPUES
\. :BUSCA UN PUNTO LITERAL (.) SE UNA \ ANTES DEL PUNTO PORQUE EL PUNTO EN UNA EXPRESION
\S+: BUSCA UNO O MAS CARACTERES QUE NO SEAN UN ESPACIO EN BLANCO DESPUES DEL PUNTO
$: INDICA EL FINAL DE LA CADENA
*/

const user = mongoose.model("User", userSchema, "User");

module.exports = user;
