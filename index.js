const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// parse application/json
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const conn = require('./db.js');
const gastos = require('./gastos/gastos.config.js');
const facturas = require('./facturas/facturas.config.js');
const categorias = require('./categorias/categorias.config.js');
const clientes = require('./clientes/clientes.config.js');
const tipoGastos = require('./tipoGasto/tipoGasto.config.js');
const productos = require('./productos/productos.config.js');
const ventas = require('./ventas/ventas.config.js');

gastos.routesConfig(app);
clientes.routesConfig(app);
categorias.routesConfig(app);
tipoGastos.routesConfig(app);
productos.routesConfig(app);
ventas.routesConfig(app);


//Servidor corriendo
app.listen(3500,() =>{
  console.log('Server started on port 3000...');
});
