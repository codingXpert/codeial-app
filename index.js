const express = require('express');
const app = express();
const path = require("path");
const uploads=path.join(__dirname,'uploads');
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require("connect-mongo");
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets =  require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen('5000');
console.log("Chat server is listening on port 5000");

app.use(sassMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug: true,
  outputStyle: 'expanded',
  prefix: '/css' 
}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static('./assets'));
//make the uploads path available to the browser
app.use("/uploads",express.static(__dirname + "/uploads"))
app.use(expressLayouts);
//extract style and script from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(
  session({
    name: 'codeial',
    secret: 'somethingblabla',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // cookie valid for 24 hours
    store:MongoStore.create({mongoUrl:process.env.MONGO_URI}),
  })
);

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(passport.setAuthenticatedUser);
  app.use(flash());
  app.use(customMware.setFlash);

  //use express route
  app.use('/', require('./routes'));
  
app.listen(port, function(err) {
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});