const userData = require("../../data/usuarios.data");

exports.getUser = async (email) => {
    return await userData.findByEmail(email);
};
