const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fileUpload = require('express-fileupload');
var nodemailer = require('nodemailer');
var cors = require('cors');
// parse application/json
var transporter = nodemailer.createTransport({
  pool: true,
  host: "mail.vase.cl",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "jazmin@vase.cl",
    pass: "claveJazmin"
  }
});

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Accept-Patch: application/example, text/example");
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
const tipoProducto = require('./tipoProducto/tipoProducto.config.js');
const usuarios = require('./usuarios/usuarios.config.js');
const archivos = require('./archivos/archivos.config.js');
const empresas = require('./empresas/empresa.config.js');
const cotizaciones = require('./cotizaciones/cotizaciones.config.js');

gastos.routesConfig(app);
clientes.routesConfig(app);
categorias.routesConfig(app);
tipoGastos.routesConfig(app);
productos.routesConfig(app);
ventas.routesConfig(app);
tipoProducto.routesConfig(app);
usuarios.routesConfig(app);
archivos.routesConfig(app);
empresas.routesConfig(app);
cotizaciones.routesConfig(app);

app.get('/',(req,res) =>{
	 res.json({"message": "Todo ok"});
})
app.post('/email', (req,res)=>{
  let to = req.body.email;
  let subject = req.body.subject;
  let message = req.body.message;
  var mailOptions = {
    from: 'Correos Jazmín <jazmin@vase.cl>',
    to: to,
    subject: subject,
    //text: message,
    html : message
  };
  if (req.body.attachments == "si"){
      mailOptions.attachments = { filename: req.body.nombreArchivo,path: req.body.path}
  }
  transporter.sendMail(mailOptions, function(error, info){
    console.log(mailOptions)
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.json({"message": "Enviado correctamente"});
    }
  });
})
//Servidor corriendo
app.listen(3500,() =>{
  console.log('Server started on port 3500...');
});

