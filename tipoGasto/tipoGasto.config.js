const conn = require('../db.js');
exports.routesConfig = function (app) {
  //mostrar todos los tipoProducto
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());

  app.get('/api/tipoProducto',(req, res) => {
    let sql = "SELECT * FROM tipoProducto";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });


  //Mostrar un solo gasto
  app.get('/api/tipoProducto/:id',(req, res) => {
    let sql = "SELECT * FROM tipoProducto WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //Agregar uno
  app.post('/api/tipoProducto',(req, res) => {
    let data = {titulo: req.body.titulo, codigo: req.body.codigo};
    let sql = "INSERT INTO tipoProducto SET ?";
    console.log(data);
    console.log(req);
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Actualizar gasto
  app.put('/api/tipoProducto/:id',(req, res) => {
    let sql = "UPDATE tipoProducto SET titulo='"+req.body.titulo+"', codigo='"+req.body.codigo+"' WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Borrar gasto
  app.delete('/api/tipoProducto/:id',(req, res) => {
    let sql = "DELETE FROM tipoProducto WHERE id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

};
