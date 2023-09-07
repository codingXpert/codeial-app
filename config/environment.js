require("dotenv/config");

const development = {
name: 'development',
asset_path: './assets',
session_cookie_key: 'somethingblabla',
db: 'mongodb+srv://codeial_user:1234@cluster0.adf3vri.mongodb.net/codeial_development',
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
name: 'production'
}

module.exports = development;