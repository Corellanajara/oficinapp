const conn = require('../db.js');
exports.routesConfig = function (app) {
  //mostrar todos los tipoGasto
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());

  app.get('/api/tipoGasto',(req, res) => {
    let sql = "SELECT * FROM tipoGasto";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });


  //Mostrar un solo gasto
  app.get('/api/tipoGasto/:id',(req, res) => {
    let sql = "SELECT * FROM tipoGasto WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Agregar uno
  app.post('/api/tipoGasto',(req, res) => {
    let data = {titulo: req.body.titulo, codigo: req.body.codigo};
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
    let sql = "UPDATE cliente SET titulo='"+req.body.titulo+"', codigo='"+req.body.codigo+"' WHERE id="+req.params.id;
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
