const mongoose = require("mongoose");
require("dotenv").config();

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clusteradso2498009.njas8p5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(URI, {useNewUrlParser: true});

module.exports = mongoose;
