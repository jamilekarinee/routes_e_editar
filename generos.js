var express = require('express');
var router = express.Router(); 
let db = require('../utils/db');

/* listar GENEROS */ 
router.get('/listar', function(req, res){
  let cmd = 'SELECT tb_genero.id_genero, nome_genero, count(tb_filme.Id_Genero) AS qt_filme '
  cmd = cmd + 'FROM tb_genero left join tb_filme'
  cmd = cmd + ' ON tb_genero.Id_Genero = tb_filme.Id_Genero GROUP BY nome_genero ORDER BY id_genero;'; 
  db.query(cmd, [], function(erro, listagem){
    if(erro){
      res.send(erro); 
    } 
    res.render('generos_lista', {resultado: listagem}); 
  })
  });


/* listar GENEROS - select */ 
  router.get('/listagem', function(req, res ){
    let cmd = "SELECT id_genero, nome_genero FROM tb_genero ORDER BY id_genero;"; 
    db.query(cmd, [], function(erro, listagem){
      if(erro){
        res.send(erro); 
      } 
      res.json({resultado: listagem}); 
    })
  });

/* adicionar GENEROS */
router.get('/add', function(req, res ){ /* post vai incluir algo */ 
  res.render('generos', {resultado: {}}); 
});

/* adicionar GENEROS */
router.post('/add', function(req, res ){
  let cmd = 'INSERT INTO tb_genero (nome_genero) VALUES (?)'
  let nome      = req.body.nome; 
  db.query(cmd, [nome], function(erro, listagem){
    if(erro){
      res.send(erro); 
    } 
    res.redirect('/generos/listar');
  })
});

/* excluir GENEROS */
router.delete('/delete/:id', function(req, res ){
  let id        = req.params.id; 
  let cmd = "DELETE FROM tb_genero WHERE id_genero = ?; "; 
  db.query(cmd, [id], function(erro){ 
    if(erro){
      res.send(erro); 
    } 
    res.redirect(303, '/generos/listar'); 
  })
});


module.exports = router;   