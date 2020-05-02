const conn = require('../db.js');
exports.routesConfig = function (app) {
  //mostrar todos los empresas
  app.get('/api/empresas',(req, res) => {
    let sql = "SELECT * FROM empresa";
    console.log(sql);
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //Mostrar una sola empresa
  app.get('/api/empresas/:id',(req, res) => {
    let sql = "SELECT * FROM empresa WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Agregar uno
  app.post('/api/empresas',(req, res) => {
    let data = {estado:true,nombre: req.body.nombre, giro: req.body.giro,rut:req.body.rut,direccion:req.body.direccion,comuna:req.body.comuna,ciudad:req.body.ciudad,contacto:req.body.contacto,url:req.body};
    let sql = "INSERT INTO empresa SET ?";
    console.log(data);
    console.log(req);
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //Actualizar gasto
  app.put('/api/empresas/:id',(req, res) => {
    let sql = "UPDATE empresa SET estado = '"+req.body.estado+"', nombre='"+req.body.nombre+"', giro='"+req.body.giro+"', rut='"+req.body.rut+"', direccion='"+req.body.direccion+"', ciudad='"+req.body.ciudad+"',url = '"+req.body.url+"',comuna = '"+req.body.comuna+"', contacto='"+req.body.contacto+"' WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Borrar gasto
  app.delete('/api/empresas/:id',(req, res) => {
    let sql = "DELETE FROM empresa WHERE id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

};

