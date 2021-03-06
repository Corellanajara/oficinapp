const conn = require('../db.js');
exports.routesConfig = function (app) {
  //mostrar todos los gastos
  app.get('/api/gastos',(req, res) => {
    var idEmpresa = req.headers.idempresa;
    if(!idEmpresa){
      res.send(JSON.stringify({}));
    }    
    let sql = "SELECT * FROM gastos where idEmpresa = "+idEmpresa;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });


  //Mostrar un solo gasto
  app.get('/api/gastos/:id',(req, res) => {
    let sql = "SELECT * FROM gastos WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //Agregar uno
  app.post('/api/gastos',(req, res) => {
    let data = {titulo: req.body.titulo,descripcion : req.body.descripcion, monto: req.body.monto,tipo:req.body.tipo,fecha:req.body.fecha,estado:1,idEmpresa : req.body.idEmpresa,usuario:req.body.idUsuario}
    let sql = "INSERT INTO gastos SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //Actualizar gasto
  app.put('/api/gastos/:id',(req, res) => {
    let sql = "UPDATE gastos SET titulo='"+req.body.titulo+"', descripcion='"+req.body.descripcion+"' , monto='"+req.body.monto+"' , tipo='"+req.body.tipo+"', fecha='"+req.body.fecha+"', estado='"+req.body.estado+"'    WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Borrar gasto
  app.delete('/api/gastos/:id',(req, res) => {
    let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

};
