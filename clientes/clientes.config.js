const conn = require('../db.js');
exports.routesConfig = function (app) {
  //mostrar todos los clientes
  app.get('/api/clientes',(req, res) => {
    console.log(req.headers);
    console.log(req.headers.empresa);
    let sql = "SELECT * FROM cliente";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //Mostrar un solo gasto
  app.get('/api/clientes/:id',(req, res) => {
    let sql = "SELECT * FROM cliente WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Agregar uno
  app.post('/api/clientes',(req, res) => {
    let data = {estado:true,nombre: req.body.nombre, giro: req.body.giro,rut:req.body.rut,direccion:req.body.direccion,comuna:req.body.comuna,ciudad:req.body.ciudad,contacto:req.body.contacto,tipoCompra:req.body.tipoCompra};
    let sql = "INSERT INTO cliente SET ?";
    console.log(data);
    console.log(req);
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Actualizar gasto
  app.put('/api/clientes/:id',(req, res) => {
    let sql = "UPDATE cliente SET estado = '"+req.body.estado+"', nombre='"+req.body.nombre+"', giro='"+req.body.giro+"', rut='"+req.body.rut+"', direccion='"+req.body.direccion+"', ciudad='"+req.body.ciudad+"', contacto='"+req.body.contacto+"' WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Borrar gasto
  app.delete('/api/clientes/:id',(req, res) => {
    let sql = "DELETE FROM cliente WHERE product_id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

};
