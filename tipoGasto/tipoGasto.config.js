const conn = require('../db.js');
exports.routesConfig = function (app) {
  //mostrar todos los tipoGasto
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());

  app.get('/api/tipoGasto',(req, res) => {
    var idEmpresa = req.headers.idempresa;
    if(!idEmpresa){
      res.send(JSON.stringify({}));
    }
    let sql = "SELECT * FROM tipoGasto where idEmpresa = "+idEmpresa;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });


  //Mostrar un solo gasto
  app.get('/api/tipoGasto/:id',(req, res) => {
    let sql = "SELECT * FROM tipoGasto WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //Agregar uno
  app.post('/api/tipoGasto',(req, res) => {
    let data = {titulo: req.body.titulo, codigo: req.body.codigo,estado:1,idEmpresa : req.body.idEmpresa,usuario:req.body.idUsuario};
    let sql = "INSERT INTO tipoGasto SET ?";
    console.log(data);
    console.log(req);
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Actualizar gasto
  app.put('/api/tipoGasto/:id',(req, res) => {
    let sql = "UPDATE tipoGasto SET titulo='"+req.body.titulo+"', codigo='"+req.body.codigo+"', estado = '"+req.body.estado+"' WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Borrar gasto
  app.delete('/api/tipoGasto/:id',(req, res) => {
    let sql = "DELETE FROM tipoGasto WHERE id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

};
