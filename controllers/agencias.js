var express = require('express');
var router = express.Router();

router.get('/',  function (req, res) {


    global.conn.request().query`select * from agencia; `
      .then(result => {
        if (req.query.success)
            res.render('agencias/index', { agencias: result.recordset, mensagem: 'Agencia cadastrada com Sucesso!' });
        else
            res.render('agencias/index', { agencias: result.recordset, mensagem: null });

          // res.json({agencias: result.recordset})
  
      }).catch(err => {
        console.log(err);
      })
  
  
  });

  router.get('/details/:id',  function (req, res) {

    agencia_id = parseInt(req.params.id);

    

    global.conn.request().query`select * from agencia as ag left join caixa as cx on ag.agencia_id = cx.fk_agencia where agencia_id = ${agencia_id} ; `
      .then(result => {

        if (req.query.success)
            res.render('agencias/details', { agencias: result.recordset, mensagem: 'Caixa cadastrado com Sucesso!' });
        else
            res.render('agencias/details', { agencias: result.recordset, mensagem: null });

          // res.json({agengias: result.recordset})
  
      }).catch(err => {
        console.log(err);
      })
  
  
  });

  //CREATE GET
  router.get('/create/',  function (req, res) {

      if (req.statusCode == 302){
          res.json({certo:"ok beleza"})
      }
  
      res.render('agencias/create',{foi:"ae"})
  
  });
  
  // CREATE POST
  router.post('/create/',  function (req, res) {

    let nnAgencia = req.body.numeroagencia;
    let endereco = req.body.endereco;
    let numero = req.body.numero;
    let cidade= req.body.cidade;
    let estado = req.body.estado;
    
    let cep = req.body.cep;

    
    global.conn.request().query`insert into agencia values(${nnAgencia},${endereco},${numero},${cep},${cidade},${estado})`
      .then(result => {

        res.redirect('/agencias?success=true')
        // if (req.query.success)
        //   res.render('agencias/index', { agencias: result.recordset, mensagem: 'Incubadora cadastrada com Sucesso!' });
        // else
        // res.render('agencias/index', { agencias: result.recordset, mensagem: null });

          // res.json({agengias: result.recordset})
  
      }).catch(err => {
        console.log(err);
      })
    

});



module.exports = router;