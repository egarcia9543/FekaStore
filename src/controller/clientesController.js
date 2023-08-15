
exports.renderLandingPage = (req, res) => {
    res.render('index')
}

exports.renderSignupForm = (req, res) => {
    res.render('signup')
}

exports.renderLoginForm = async (req, res) => {
    res.render('signin');
}

exports.renderRecoverForm = (req, res) => {
    res.render('formulario')
}