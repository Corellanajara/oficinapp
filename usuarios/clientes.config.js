const conn = require('../db.js');
exports.routesConfig = function (app) {
  //mostrar todos los clientes
  app.get('/api/usuarios',(req, res) => {
    let sql = "SELECT * FROM usuario";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  app.post('/api/login/',(req,res)=>{
    let usuario = req.body.usuario;
    let clave = req.body.clave; //DESHACHEAR O ALGO
    let sql = "select * from usuario where usuario = '"+usuario+"' and clave = '"+clave+"' ";
    let query = conn.query(sql,(err,results)=>{
      if(results){
        console.log(results);
      }else{
        console.log("NO HAY RESULTADOS");
      }

    })
  });

  //Mostrar un solo gasto
  app.get('/api/usuarios/:id',(req, res) => {
    let sql = "SELECT * FROM cliente WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Agregar uno
  app.post('/api/usuarios',(req, res) => {
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
  app.put('/api/usuarios/:id',(req, res) => {
    let sql = "UPDATE cliente SET estado = '"+req.body.estado+"', nombre='"+req.body.nombre+"', giro='"+req.body.giro+"', rut='"+req.body.rut+"', direccion='"+req.body.direccion+"', ciudad='"+req.body.ciudad+"', contacto='"+req.body.contacto+"' WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Borrar gasto
  app.delete('/api/usuarios/:id',(req, res) => {
    let sql = "DELETE FROM cliente WHERE product_id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

};
