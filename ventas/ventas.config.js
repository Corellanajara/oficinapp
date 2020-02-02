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
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      if(results.insertId>0 && detalle){
        for(let i = 0 ; i < detalles.length;i++){
          var detalle = detalles[i];
          sql = "insert into detalle_venta set ?";
          data = {id_producto:detalle.id_producto,titulo:detalle.titulo,precio:detalle.precio,cantidad:detalle.cantidad};
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
    let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
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
