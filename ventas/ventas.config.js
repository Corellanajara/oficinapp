const conn = require('../db.js');
exports.routesConfig = function (app) {
  //mostrar todos los ventas
  app.get('/api/ventas',(req, res) => {
    let sql = "SELECT * FROM ventas";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });


  //Mostrar un solo gasto
  app.get('/api/ventas/:id',(req, res) => {
    let sql = "SELECT * FROM ventas WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //Agregar uno
  app.post('/api/ventas',(req, res) => {
    let data = {id_cliente: req.body.id_cliente, fecha: req.body.fecha};
    let sql = "INSERT INTO ventas SET ?";
    let detalles = req.body.detalles;
console.log(detalles);
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
     console.log(results)
     console.log(results.insertId)
      if(results.insertId>0 && detalles){
        for(let i = 0 ; i < detalles.length;i++){
          var detalle = detalles[i];
          sql = "insert into detalle_venta set ?";
          data = {id_producto:detalle.id_producto,id_venta:results.insertId,titulo:detalle.titulo,precio:detalle.precio,cantidad:detalle.cantidad};
          conn.query(sql, data,(err, results) => {
            if(err) throw err;
          })
        }
      }
      res.send(JSON.stringify(results));
    });
  });

  //Actualizar gasto
   app.put('/api/ventas/:id',(req, res) => {
    let sql = "UPDATE ventas SET id_cliente='"+req.body.id_cliente+"', fecha='"+req.body.fecha+"',estado = '"+req.body.estado+"' WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Borrar gasto
  app.delete('/api/ventas/:id',(req, res) => {
    let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

};
