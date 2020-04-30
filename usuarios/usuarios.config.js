const conn = require('../db.js');
exports.routesConfig = function (app) {
  //mostrar todos los clientes
  app.get('/api/usuarios',(req, res) => {
    let sql = "SELECT * FROM usuario where idEmpresa = "+req.headers.idempresa;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });
  app.post('/api/usuarios/validarCorreo',(req, res) => {
    var correo = req.body.correo;
    let sql = "SELECT * FROM usuario where correo = '"+correo+"' ";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      if(results.length == 0){
        res.send(true);
      }else{
        res.send(false);
      }
    });
  });

  app.post('/api/login/',(req,res)=>{
    let usuario = req.body.usuario;
    let clave = req.body.clave; //DESHACHEAR O ALGO
    let sql = "select * from usuario where correo = '"+usuario+"' and clave = '"+clave+"' ";
    console.log(sql);
    console.log(req.body);
    let query = conn.query(sql,(err,results)=>{
      console.log(results);

      if(results.length > 0){
	if(results.length > 1){
		res.send(JSON.stringify([]));
	}else{

        console.log(results[0].idEmpresa);
        var idEmpresa = results[0].idEmpresa;
        sql = "select * from empresa where id = "+idEmpresa;
        var data = {usuario : results , empresa : []};
        query = conn.query(sql,(error,resultados)=>{
            data.empresa = resultados;
            res.send(JSON.stringify(data));
       	 })
	}
      }else{
        console.log("NO HAY RESULTADOS");
        res.send(JSON.stringify([]));
      }

    })
  });

  //Mostrar un solo gasto
  app.get('/api/usuarios/:id',(req, res) => {
    let sql = "SELECT * FROM usuario WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //Agregar uno
  app.post('/api/usuarios',(req, res) => {
    let data = {nombre:req.body.nombre,apellido:req.body.apellido,correo:req.body.correo,clave:req.body.clave,estado:true,idEmpresa : req.headers.idempresa};
    let sql = "INSERT INTO usuario SET ?";
    console.log(data);
    console.log(req);
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //Actualizar gasto
  app.put('/api/usuarios/:id',(req, res) => {
    let sql = "UPDATE usuario SET estado = '"+req.body.estado+"', nombre='"+req.body.nombre+"', apellido='"+req.body.apellido+"', correo='"+req.body.correo+"', clave='"+req.body.clave+"' WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Borrar gasto
  app.delete('/api/usuarios/:id',(req, res) => {
    let sql = "DELETE FROM usuario WHERE id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify(results));
    });
  });

};

