var express = require('express');
var router = express.Router();

  //CREATE GET
  router.get('',  function (req, res) {


    global.conn.request().query`select * from incidente as inc join caixa as cx on inc.fk_caixa = cx.caixa_id join agencia as ag  on ag.agencia_id = cx.fk_agencia;`
    .then(result => {


      res.json(result.recordset)

    }).catch(err => {
      console.log(err);
    })


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
  router.get('/criticidade/:id',  function (req, res) {
    let criticidade = req.params.id

    global.conn.request().query`select * from incidente as inc join caixa as cx on inc.fk_caixa = cx.caixa_id join agencia as ag  on ag.agencia_id = cx.fk_agencia join criticidade as cri on inc.fk_criticidade = cri.criticidade_id where cri.criticidade_id = ${criticidade};`
    .then(result => {


      res.json(result.recordset)

    }).catch(err => {
      console.log(err);
    })

    

});


router.get('/medicao/:id',  function (req, res) {
  let caixa_id = req.params.id



  global.conn.request().query`select Top(1) * from medicao where fk_caixa = ${caixa_id} order by medicao_id desc; `
    .then(result => {

      
        // res.render('caixas/details', {caixa: result.recordset});

        res.json(result.recordset[0])

    }).catch(err => {
      console.log(err);
    })
  // if (req.statusCode == 302){


  // res.render('agencias/create',{foi:"ae"})

  // res.render('caixas/create',{agencia_id:agencia_id})

});

    // if (req.statusCode == 302){
    //     res.json({certo:"ok beleza"})
    // }

    // res.render('agencias/create',{foi:"ae"})

    // res.render('caixas/create',{agencia:agenciaId})



 




module.exports = router;