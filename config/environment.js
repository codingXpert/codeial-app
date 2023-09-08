require("dotenv/config");

const development = {
name: 'development',
asset_path: './assets',
session_cookie_key: 'somethingblabla',
db: process.env.MONGO_URI,
smtp: {
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
      user: process.env.API_USER,
      pass: process.env.API_PASS,
    },
  },

  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  jwt_secret: "codeial"
}


const production = {
name: 'production',
asset_path: './assets',
session_cookie_key: process.env.SESSION_COOKIE_KEY,
db: process.env.MONGO_URI,
smtp: {
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
      user: process.env.API_USER,
      pass: process.env.API_PASS,
    },
  },

  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  jwt_secret: process.env.JWT_SECRET
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);