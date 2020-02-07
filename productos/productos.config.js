


const conn = require('../db.js');
exports.routesConfig = function (app) {
  //mostrar todos los productos
  app.get('/api/productos',(req, res) => {
    var idEmpresa = req.headers.idempresa;
    if(!idEmpresa){
      res.send(JSON.stringify({}));
    }
    let sql = "SELECT * FROM productos where idEmpresa = "+idEmpresa;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });


  //Mostrar un solo gasto
  app.get('/api/productos/:id',(req, res) => {
    let sql = "SELECT * FROM productos WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //Agregar uno
  app.post('/api/productos',(req, res) => {
    let data = {titulo: req.body.titulo, precio: req.body.precio,codigo:req.body.codigo,idEmpresa : req.body.idEmpresa,usuario:req.body.idUsuario};
    let sql = "INSERT INTO productos SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //Actualizar gasto
  app.put('/api/productos/:id',(req, res) => {
    let sql = "UPDATE productos SET titulo='"+req.body.titulo+"', precio='"+req.body.precio+"' , codigo = '"+req.body.codigo+"' ,estado = '"+req.body.estado+"' WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Borrar gasto
  app.delete('/api/productos/:id',(req, res) => {
    let sql = "DELETE FROM productos WHERE id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

};
