const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const cliente = require('../models/clientes')


passport.use(new localStrategy({
    usuario: 'emailLogin',
    password: 'pwdLogin'
}, async (email, password, done) => {

    const usuario = await cliente.findOne({ email })
    if (!usuario) {
        return done(null, false, { message: "404" });
    } else {
        const passwordCorrecta = usuario && usuario.password ? await bcrypt.compare(password, usuario.password) : false;
        if (passwordCorrecta) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }
    }

}
));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
}) 

passport.deserializeUser((id, done) => {
    cliente.findById(id, (err, user) => {
        done(err, user);
    })
})