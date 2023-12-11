var express = require('express');
var router = express.Router(); 
let db = require('../utils/db');

/* listar CINEMAS */ 
router.get('/listar', function(req, res){
  let cmd = 'SELECT id_cinema, nome_cinema, endereco_cinema FROM tb_cinema ORDER BY id_cinema; '; 
  db.query(cmd, [], function(erro, listagem){
    if(erro){
      res.send(erro); 
    } 
    res.render('cinemas_lista', {resultado: listagem}); 
  })
  });


/* listar CINEMA - select */ 
  router.get('/listagem', function(req, res ){
    let cmd = "SELECT id_cinema, nome_cinema, endereco_cinema FROM tb_cinema ORDER BY id_cinema; "; 
    db.query(cmd, [], function(erro, listagem){
      if(erro){
        res.send(erro); 
      } 
      res.json({resultado: listagem}); 
    })
  });

/* adicionar CINEMAS */
router.get('/add', function(req, res ){ /* post vai incluir algo */ 
  res.render('cinemas', {resultado: {}}); 
});

/* adicionar CINEMAS */
router.post('/add', function(req, res ){
  let cmd = 'INSERT INTO tb_cinema (nome_cinema, endereco_cinema) VALUES (?, ?) '; 
  let nome      = req.body.nome; 
  let endereco  = req.body.endereco; 
  db.query(cmd, [nome, endereco], function(erro, listagem){
    if(erro){
      res.send(erro); 
    } 
    res.redirect('/cinemas/listar'); 
  })
});

/* excluir CINEMAS */
router.delete('/delete/:id', function(req, res ){
  let id        = req.params.id; 
  let cmd = 'DELETE FROM tb_cinema WHERE id_cinema = ?; '; 
  db.query(cmd, [id], function(erro){ 
    if(erro){
      res.send(erro); 
    } 
    res.redirect(303, '/cinemas/listar'); 
  })
});


module.exports = router;   