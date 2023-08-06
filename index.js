const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
//extract style and script from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(
    session({
      name:'codeial',
      secret: 'somethingblabla',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 }, //cookie valid for 24 hours
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());

  //use express route
  app.use('/', require('./routes'));
  
app.listen(port, function(err) {
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});