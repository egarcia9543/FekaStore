const userData = require("../../data/usuarios.data");
const clientData = require("../../data/clientes.data");
const sendEmail = require("../../utils/emailService");
const bcrypt = require("bcrypt");

exports.recoverPassword = async (userEmail) => {
  const newPassword = Math.random().toString(36).slice(-8);
  const encryptedNewPassword = await bcrypt.hash(newPassword, 12);

  const user = await userData.findByEmailAndUpdate(userEmail, {password: encryptedNewPassword});
  const client = await clientData.findByEmailAndUpdate(userEmail, {password: encryptedNewPassword});

  if (!user && !client) {
    return {error: "No existe un usuario con ese email"};
  }

  await sendEmail.sendEmail(
      userEmail,
      "Recuperación de contraseña",
      `Su nueva contraseña es: ${newPassword}`,
  );

  return {message: "Se ha enviado un email con su nueva contraseña"};
};
