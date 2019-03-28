const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const session = require('express-session');

//Requisição de arquivos de rotas
const indexRouter = require('./routers/index')

app = express()



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ resave: true,
    saveUninitialized: true,
    secret: '123' }));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter)


app.listen(3000, function() {
    console.log('App executando na porta 3000!');
  });