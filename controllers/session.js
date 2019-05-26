var express = require('express');
var router = express.Router();
var passport = require('passport');
var ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('login', { message: null });
});


router.get('/login',ensureLoggedOut('/incubadoras'), function (req, res) {
  if (req.query.fail)
    res.render('login', { message: 'Usuário e/ou senha incorretos!' });
  else
    res.render('login', { message: null });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.render('dashboard');
  });
router.get('/dashboard',(req,res)=>{

    res.render('dashboard')
});

  //Desloga do sistema
router.get('/logout', (req, res)=>{
  req.session.destroy(function (err) {
    res.redirect('/session/login'); 
  });

})

  


module.exports = router;
