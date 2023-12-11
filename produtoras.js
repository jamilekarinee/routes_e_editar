var express = require('express');
var router = express.Router(); 
let db = require('../utils/db');

/* listar PRODUTORAS */ 
router.get('/listar', function(req, res){
    let cmd = 'SELECT endereco_produtora, tb_produtora.id_produtora, nome_produtora, count(tb_filme.Id_Produtora) '; 
    cmd = cmd  + 'AS qt_filme FROM tb_produtora left join tb_filme '; 
    cmd = cmd + 'ON tb_produtora.Id_Produtora = tb_filme.Id_Produtora GROUP BY nome_produtora ORDER BY id_produtora;'; 
    db.query(cmd, [], function(erro, listagem){
      if(erro){
        res.send(erro); 
      } 
      res.render('produtoras_lista', {resultado: listagem}); 
    })
    });


/* listar PRODUTORAS - select */ 
router.get('/listagem', function(req, res){
    let cmd = 'SELECT id_produtora, nome_produtora, endereco_produtora FROM tb_produtora ORDER BY id_produtora; '; 
    db.query(cmd, [], function(erro, listagem){
      if(erro){
        res.send(erro); 
      } 
      res.json({resultado: listagem}); 
    })
  });

/* adicionar PRODUTORAS */
router.get('/add', function(req, res ){ /* post vai incluir algo */ 
res.render('produtoras', {resultado: {}}); 
});

/* adicionar PRODUTORAS */
router.post('/add', function(req, res ){
  let cmd = 'INSERT INTO tb_produtora (nome_produtora, endereco_produtora) VALUES (?, ?) ';
  let nome      = req.body.nome; 
  let endereco  = req.body.endereco; 
  db.query(cmd, [nome, endereco], function(erro, listagem){
    if(erro){
      res.send(erro); 
    } 
    res.redirect('/produtoras/listar'); 
  })
});

router.get('/edit/:id', function(req, res) {
  let id = req.params.id;
  let cmd = "SELECT * FROM tb_produtora WHERE id_produtora = ?;";
  
  db.query(cmd, [id], function(erro, listagem){
  if (erro){
  res.send(erro);
  }
  res.render('produtoras_add', {resultado: listagem[0]});
  });
  });

/* editar PRODUTORAS */ 
router.put('/edit/:id', function(req, res ){
  let id = req.params.id; 
  let nome      = req.body.nome; 
  let endereco  = req.body.endereco; 
  let cmd = "UPDATE tb_produtora SET nome_produtora=?, endereco_produtora=? WHERE id_produtora=?; ";  
  db.query(cmd, [nome, endereco, id], function(erro, listagem){
    if(erro){      
      res.send(erro); 
    } 
    res.render('produtoras_add', {resultado: listagem[0]}); 
  })
});

/* excluir PRODUTORAS */
router.delete('/delete/:id', function(req, res ){
  let id        = req.params.id; 
  let cmd = 'DELETE FROM tb_produtora WHERE id_produtora = ? '; 
  db.query(cmd, [id], function(erro){ 
    if(erro){
      res.send(erro); 
    } 
    res.redirect(303, '/produtoras/listar'); 
  })
});

module.exports = router;   