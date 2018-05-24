const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// const env = process.env.NODE_ENV || "development";
// const config = require("../config")[env];
// const instance = new Mongoose();
const instance = mongoose.connect('mongodb://heroku_5td1tzzv:k1pllddcpirfk35untl66qk6vk@ds143131.mlab.com:43131/heroku_5td1tzzv', function (err,res) {
  if(err)
    console.log("error connecting to db");

  else
    console.log("connected to write in db");
});

module.exports = exports = instance;