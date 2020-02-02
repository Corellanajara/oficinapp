const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// parse application/json
app.use(bodyParser.json());

const conn = require('./db.js');
const gastos = require('./gastos/gastos.config.js');
const facturas = require('./facturas/facturas.config.js');
const categorias = require('./categorias/categorias.config.js');
//const clientes = require('./clientes/clientes.config.js');
const tipoGastos = require('./tipoGasto/tipoGasto.config.js');
const productos = require('./productos/productos.config.js');

gastos.routesConfig(app);
//clientes.routesConfig(app);
categorias.routesConfig(app);
tipoGastos.routesConfig(app);
productos.routesConfig(app);

app.get('/api/clientes',(req, res) => {
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
  let data = {nombre: req.body.nombre, giro: req.body.giro,rut:req.body.rut,direccion:req.body.direccion,comuna:req.body.comuna,ciudad:req.body.ciudad,contacto:req.body.contacto,tipoCompra:req.body.tipoCompra};
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
  let sql = "UPDATE cliente SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
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

//Servidor corriendo
app.listen(3500,() =>{
  console.log('Server started on port 3000...');
});
