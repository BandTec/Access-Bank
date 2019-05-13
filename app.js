const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
require('./controllers/auth')(passport);
const sessionRouter = require('./controllers/session');
const usersRouter = require('./controllers/users');
const agenciaRouter = require('./controllers/agencias');
const medicaoRouter = require('./controllers/medicao');
const recemNasc = require('./controllers/recemNasc');

const app = express();
app.use(cors());

app.use(session({
  secret: '123', // configure um segredo seu aqui
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', sessionRouter);
app.use('/users', usersRouter);
app.use('/agencias', agenciaRouter);
app.use('/medicao', medicaoRouter);
app.use('/recemNasc', recemNasc);


// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// // error handler
// app.use((err, req, res) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
module.exports = app;
