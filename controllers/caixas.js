var express = require('express');
var router = express.Router();

  //CREATE GET
  router.get('/create/:id',  function (req, res) {
    let agencia_id = req.params.id
    // if (req.statusCode == 302){


    // res.render('agencias/create',{foi:"ae"})

    res.render('caixas/create',{agencia_id:agencia_id})

});

  //CREATE POST
  router.post('/create/',  function (req, res) {
    let numeroSerial = req.body.numeroserial
    let configurado = 0
    let descricao = req.body.descricao
    let agencia_id = req.body.agencia_id

    global.conn.request().query`insert into caixa values(${numeroSerial},${configurado},${descricao},${agencia_id})`
    .then(result => {

      // res.redirect('/agencias?success=true')
      // if (req.query.success)
      //   res.render('agencias/index', { agencias: result.recordset, mensagem: 'Incubadora cadastrada com Sucesso!' });
      // else
      // res.render('agencias/index', { agencias: result.recordset, mensagem: null });

      res.redirect(`/agencias/details/${agencia_id}?success=true`)

    }).catch(err => {
      console.log(err);
    })

  });


    //CREATE GET
  router.get('/details/:id',  function (req, res) {
    let caixa_id = req.params.id

    global.conn.request().query`select * from caixa as cx join cpu as cp on cx.caixa_id = cp.fk_caixa join memoria as mem on cx.caixa_id = mem.fk_caixa join os as os on cx.caixa_id = os.fk_caixa join disco as disco on cx.caixa_id = disco.fk_caixa where caixa_id = ${caixa_id}; `
      .then(result => {

       
          res.render('caixas/details', {caixa: result.recordset});

          // res.json({agengias: result.recordset})
  
      }).catch(err => {
        console.log(err);
      })
    // if (req.statusCode == 302){


    // res.render('agencias/create',{foi:"ae"})

    // res.render('caixas/create',{agencia_id:agencia_id})

});


//Obtem dados
router.get('/medicao/:id',  function (req, res) {
  let caixa_id = req.params.id



  global.conn.request().query`select Top(1) * from medicao where fk_caixa = ${caixa_id} order by medicao_id desc; `
    .then(result => {

    

        res.json(result.recordset[0])

    }).catch(err => {
      console.log(err);
    })
 

});




 




module.exports = router;