const conn = require('../db.js');
exports.routesConfig = function (app) {
  //mostrar todos los categorias
  app.get('/api/categorias',(req, res) => {
    let sql = "SELECT * FROM categorias";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });


  //Mostrar un solo gasto
  app.get('/api/categorias/:id',(req, res) => {
    let sql = "SELECT * FROM categorias WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });
  app.get('/api/subCategorias/:id',(req, res) => {
    let sql = "SELECT * FROM categorias WHERE idCategoria="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });
  app.post('/api/subCategorias',(req, res) => {
    let data = {titulo: req.body.titulo, urlImagen: req.body.urlImagen,urlCard:req.body.urlCard,idCategoria : req.body.idCategoria};
    let sql = "INSERT INTO subCategorias SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //Agregar uno
  app.post('/api/categorias',(req, res) => {
    let data = {titulo: req.body.titulo, urlImagen: req.body.urlImagen,urlCard:req.body.urlCard};
    let sql = "INSERT INTO categorias SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //Actualizar gasto
  app.put('/api/categorias/:id',(req, res) => {
    let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Borrar gasto
  app.delete('/api/categorias/:id',(req, res) => {
    let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

};
