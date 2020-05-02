const express = require('express');
 var fs = require('fs');
 var pdf = require('html-pdf');
 const app = express();
 let bodyParser = require('body-parser');
 app.use(express.static('data'));
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(bodyParser.json());
 app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 });

 app.get('/', (req, res) => {
     res.send('Servidor de archivos! Jazmin ');
 });

 app.post('/cotizacion',(req,res)=>{
   var url = req.body.url;
   var timestamp = new Date().getTime();
   var fechaEmision = req.body.fechaEmision.split("T")[0];
   var fechaCaducidad= req.body.fechaCaducidad.split("T")[0];
   var estado= req.body.estado;
   var idCliente= req.body.idCliente;
   var nombreCliente= req.body.nombreCliente;
   var rutCliente= req.body.rutCliente;
   var giroCliente= req.body.giroCliente;
   var direccionCliente= req.body.direccionCliente;
   var comunaCliente= req.body.comunaCliente;
   var ciudadCliente= req.body.ciudadCliente;
   var contactoCliente= req.body.contactoCliente;
   var idUsuario= req.body.idUsuario;
   var idEmpresa= req.body.idEmpresa;
   var nombreEmpresa = req.body.nombreEmpresa;
   var rutEmpresa = req.body.rutEmpresa;
   var giroEmpresa = req.body.giroEmpresa;
   var direccionEmpresa = req.body.direccionEmpresa;
   var comunaEmpresa = req.body.comunaEmpresa;
   var ciudadEmpresa = req.body.ciudadEmpresa;
   var contactoEmpresa = req.body.contactoEmpresa;
   var detalles = req.body.detalle;
   var nota = req.body.nota;
   console.log(detalles)
   var trs = "";
   var i = 0;
   var neto = 0;
   var iva = 0;
   var total = 0;
   for(var detalle of detalles){
     i++;
     trs += "<tr> <td>"+i+"</td> <td>"+detalle.titulo+"</td> <td>"+detalle.cantidad+"</td> <td>"+detalle.precio+"</td> <td>"+detalle.cantidad * detalle.precio+"</td> </tr> ";
     neto += detalle.cantidad * detalle.precio;
   }
   total = neto * 1.19;
   iva = total - neto;
   iva = Math.round(iva);
   total = Math.round(total);
   neto = Math.round(neto);
   console.log(trs);
//   var html = '<!DOCTYPE html> <html lang="en" dir="ltr"> <head> <meta charset="utf-8"> <title></title> <link type="text/css" rel="stylesheet" href="factura.css"> </head> <body> <div class="container"> <div class="parte-superior"> <div class="parte-izquierda"> <img class="logo-empresa" src="https://d500.epimg.net/cincodias/imagenes/2015/05/08/pyme/1431098283_691735_1431098420_noticia_normal.jpg"> </div> <div class="parte-derecha"> <h1>'+nombreEmpresa+'</h1> <h1>Rut: '+rutEmpresa+'</h1> <h1>Giro: '+giroEmpresa+'</h1> <h1>Dirección:'+direccionEmpresa+' - '+ciudadEmpresa+'</h1> </div> </div> <div style="margin-top:4%;"> <h1 class="fecha-derecha">Fecha de Emisión: '+fechaEmision+'</h1> </div> <div> <h1 class="fecha-derecha">Fecha de Caducidad: '+fechaCaducidad+'</h1> </div> <div class="parte-cliente"> <h1 class="datos-cliente">Señor(es): '+nombreCliente+'</h1> <h1 class="datos-cliente">Rut: '+rutCliente+'</h1> <h1 class="datos-cliente">Giro: '+giroCliente+'</h1> <h1 class="datos-cliente">Dirección: '+direccionCliente+' - '+ciudadCliente+'</h1> <h1 class="datos-cliente">Comuna: '+comunaCliente+'</h1> <h1 class="datos-cliente">Ciudad: '+ciudadCliente+' </h1> <h1 class="datos-cliente">Contacto: '+contactoCliente+'</h1> </div> <div class="parte-tablas"> <table id="customers"> <tr> <th>Número</th> <th>Producto/Servicio</th> <th>Cantidad</th> <th>Precio</th> <th>Valor</th> </tr> '+trs+' </table> </div> <div class="parte-abajo"> <div class="parte-notas"> <h1 class="nota">Nota: (*) Valores expresado en pesos y UF son más IVA.</h1> <h1 class="nota">Nota: Se mantuvo los valores del año 2018 haciendo un descuento del 8,7%</h1> </div> <div class="parte-precio"> <h1 class="datos-cliente"><b>Monto Neto</b> $ '+neto+'</h1> <h1 class="datos-cliente"><b>IVA</b> $: '+iva+'</h1> <h1 class="datos-cliente"><b>Total</b> $: '+total+'</h1> </div> </div> <div class="footer"> <svg class="imagen-logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455.62 424.31"><defs><style>.cls-1{fill:#82afec;}</style></defs><title>logo</title><path class="cls-1" d="M477.28,186.61c-34.06-21.88-80.55-28.09-121.19-23.37,4.6,32.07,3,74-12.06,102.3a86.33,86.33,0,0,1-12.31,51.59c67.5-9.58,130.77-60.91,151-113.37a14,14,0,0,0-5.47-17.15Z" transform="translate(-28.19 -43.85)"/><path class="cls-1" d="M179.33,232.72A87.65,87.65,0,0,1,232,188.47C175.85,153.3,87.22,152.8,34.77,186.61a14.22,14.22,0,0,0-5.6,17.15c14.79,38.29,49.47,70.73,85.15,90.62C129.61,270.14,152.85,244,179.33,232.72Z" transform="translate(-28.19 -43.85)"/><path class="cls-1" d="M272.06,186.11A87,87,0,0,1,328,221.29C337.69,155.91,309.1,82.07,266.22,47a14.39,14.39,0,0,0-18,0c-28.21,23-47,59.16-56.31,94,26.48,6.84,60.79,21.25,80.18,45.12Z" transform="translate(-28.19 -43.85)"/><path class="cls-1" d="M387.91,330.8c-24.61,10.32-58.05,18.64-84.53,15.16a87,87,0,0,1-68.86,10.32c32,68.62,109.39,111.87,156.87,111.87a14.26,14.26,0,0,0,13.8-10.56c10.56-40.65,1.12-88.75-17.28-126.79Z" transform="translate(-28.19 -43.85)"/><path class="cls-1" d="M199,336.89a86.59,86.59,0,0,1-29-64.64c-53.95,48.23-75.21,130.52-60.66,185.21A14.1,14.1,0,0,0,123.14,468c27.72,0,75.08-16.91,114.61-54.2-17.28-20.51-35.05-50.09-38.78-76.94Z" transform="translate(-28.19 -43.85)"/><path class="cls-1" d="M249.68,219.8A55.56,55.56,0,1,0,289,314.64l-39.28-39.28Z" transform="translate(-28.19 -43.85)"/><path class="cls-1" d="M299,218.31A55.36,55.36,0,0,0,259.75,202v55.56Z" transform="translate(-28.19 -43.85)"/><path class="cls-1" d="M301.64,232.1l-39.28,39.28,39.28,39.28A55.67,55.67,0,0,0,301.64,232.1Z" transform="translate(-28.19 -43.85)"/></svg> <h1 class="link-pagina"><a href="http://jazmin.vase.cl/" target="_blank"><b>http://jazmin.vase.cl/</a></h1> </div> </div> </body> <style> @import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap"); body{ background: #525659; margin: 0% !important; margin-left: 0% !important; } .container{ background: white; width: 21cm; min-height: 29.7cm; margin-left: calc((100% - 21cm)/2); margin-top: 5%; margin-bottom: 5%; } .parte-superior{ display: flex; padding-top: 0% !important; height: 30% !important; } .parte-izquierda{ margin-top: 2.5%; margin-left: 5%; width: 20%; } .parte-derecha{ margin-top: 2%; margin-left: 2%; } .parte-derecha h1{ font-family: "Open Sans", sans-serif; font-size: 14px; } .logo-empresa{ width: 90%; margin-left: 5%; } .fecha-derecha{ font-family: "Open Sans", sans-serif; font-size: 14px; text-align: right; margin-right: 8%; } .parte-cliente{ margin-top: 5%; margin-left: 5%; } .datos-cliente{ font-family: "Open Sans", sans-serif; font-size: 14px; } .parte-tablas{ width: 90%; margin-left: 5%; margin-top: 5%; } #customers { font-family: "Open Sans", sans-serif; font-size: 12px; border-collapse: collapse; width: 100%; } #customers td { padding: 6px; } #customers th { border: 2px solid #fff; padding: 6px; } #customers tr:nth-child(even){background-color: #f2f2f2;} #customers tr:hover {background-color: #ddd;} #customers th { padding-top: 12px; padding-bottom: 12px; text-align: left; background: #82AFEC !important; color: white; } .parte-abajo{ display: flex; } .parte-notas{ width: 45%; margin-left: 5%; margin-top: 3%; } .nota{ font-family: "Open Sans", sans-serif; font-size: 13px; } .parte-precio{ margin-top: 3%; margin-right: 5%; width: 45%; text-align: right; } .imagen-logo{ margin-top: 2%; width: 15%; margin-left: calc((100% - 15%)/2); } .link-pagina{ margin-top: 2%; font-family: "Open Sans", sans-serif; font-size: 15px; text-align: center; cursor: pointer; color: #82AFEC; } .link-pagina a{ text-decoration: none; color: #82AFEC; } @media print { body {-webkit-print-color-adjust: exact;} } </style> </html> ';
   var html = '<!DOCTYPE html><html lang="en" dir="ltr"><head> <meta charset="utf-8"> <title></title> <link type="text/css" rel="stylesheet" href="factura.css"> </head><body> <div class="container"> <div class="parte-superior"> <div class="parte-izquierda"> <img class="logo-empresa" src="'+url+'"> </div><div class="parte-derecha"> <h1>'+nombreEmpresa+'</h1> <h1>Rut: '+rutEmpresa+'</h1> <h1>Giro: '+giroEmpresa+'</h1> <h1>Dirección: '+direccionEmpresa+' - '+ciudadEmpresa+'</h1> </div></div><div class="parte-cliente"> <div class="cliente-izquierda"> <h1 class="datos-cliente">Señor(es): '+nombreCliente+'</h1> <h1 class="datos-cliente">Rut: '+rutCliente+'</h1> <h1 class="datos-cliente">Giro: '+giroCliente+'</h1> <h1 class="datos-cliente">Dirección: '+direccionCliente+' - '+ciudadCliente+'</h1> <h1 class="datos-cliente">Comuna: '+comunaCliente+'</h1> <h1 class="datos-cliente">Ciudad: '+ciudadCliente+' </h1> <h1 class="datos-cliente">Contacto: '+contactoCliente+'</h1> </div><div class="cliente-derecha"> <div style="margin-top:4%;"> <h1 class="fecha-derecha">Fecha de Emisión: '+fechaEmision+'</h1> </div><div> <h1 class="fecha-derecha">Fecha de Caducidad: '+fechaCaducidad+'</h1> </div><svg class="imagen-logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455.62 424.31"> <defs> <style>.cls-1{fill: #82afec;}</style> </defs> <title>logo</title> <path class="cls-1" d="M477.28,186.61c-34.06-21.88-80.55-28.09-121.19-23.37,4.6,32.07,3,74-12.06,102.3a86.33,86.33,0,0,1-12.31,51.59c67.5-9.58,130.77-60.91,151-113.37a14,14,0,0,0-5.47-17.15Z" transform="translate(-28.19 -43.85)"/> <path class="cls-1" d="M179.33,232.72A87.65,87.65,0,0,1,232,188.47C175.85,153.3,87.22,152.8,34.77,186.61a14.22,14.22,0,0,0-5.6,17.15c14.79,38.29,49.47,70.73,85.15,90.62C129.61,270.14,152.85,244,179.33,232.72Z" transform="translate(-28.19 -43.85)"/> <path class="cls-1" d="M272.06,186.11A87,87,0,0,1,328,221.29C337.69,155.91,309.1,82.07,266.22,47a14.39,14.39,0,0,0-18,0c-28.21,23-47,59.16-56.31,94,26.48,6.84,60.79,21.25,80.18,45.12Z" transform="translate(-28.19 -43.85)"/> <path class="cls-1" d="M387.91,330.8c-24.61,10.32-58.05,18.64-84.53,15.16a87,87,0,0,1-68.86,10.32c32,68.62,109.39,111.87,156.87,111.87a14.26,14.26,0,0,0,13.8-10.56c10.56-40.65,1.12-88.75-17.28-126.79Z" transform="translate(-28.19 -43.85)"/> <path class="cls-1" d="M199,336.89a86.59,86.59,0,0,1-29-64.64c-53.95,48.23-75.21,130.52-60.66,185.21A14.1,14.1,0,0,0,123.14,468c27.72,0,75.08-16.91,114.61-54.2-17.28-20.51-35.05-50.09-38.78-76.94Z" transform="translate(-28.19 -43.85)"/> <path class="cls-1" d="M249.68,219.8A55.56,55.56,0,1,0,289,314.64l-39.28-39.28Z" transform="translate(-28.19 -43.85)"/> <path class="cls-1" d="M299,218.31A55.36,55.36,0,0,0,259.75,202v55.56Z" transform="translate(-28.19 -43.85)"/> <path class="cls-1" d="M301.64,232.1l-39.28,39.28,39.28,39.28A55.67,55.67,0,0,0,301.64,232.1Z" transform="translate(-28.19 -43.85)"/> </svg> <h1 class="link-pagina"><a href="http://jazmin.vase.cl/" target="_blank"><b>http://jazmin.vase.cl/</a></h1> </div></div><div class="parte-tablas"> <table id="customers"> <tr> <th>Número</th> <th>Producto/Servicio</th> <th>Cantidad</th> <th>Precio</th> <th>Valor</th> </tr>'+trs+' </table> </div><div class="parte-abajo"> <div class="parte-notas"> <h1 class="nota">'+nota+'</h1> <div class="parte-precio"> <h1 class="datos-cliente"><b>Monto Neto</b> $ '+neto+'</h1> <h1 class="datos-cliente"><b>IVA</b> $: '+iva+'</h1> <h1 class="datos-cliente"><b>Total</b> $: '+total+'</h1> </div></div></div></body><style>@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap"); .container{background: white; width: 21cm; min-height: 29.7cm; margin-left: calc((100% - 21cm)/2); margin-top: 5%; margin-bottom: 5%;}.parte-superior{display: flex; padding-top: 0% !important; height: 30% !important;}.parte-izquierda{margin-top: 2.5%; margin-left: 5%; width: 20%;}.parte-derecha{margin-top: 2%; margin-left: 2%;}.parte-derecha h1{font-family: "Open Sans", sans-serif; font-size: 14px;}.logo-empresa{width: 90%; margin-left: 5%;}.fecha-derecha{font-family: "Open Sans", sans-serif; font-size: 14px; text-align: right; margin-right: 8%;}.parte-cliente{margin-top: 5%; margin-left: 5%; display: flex;}.cliente-izquierda{width: 50%;}.cliente-derecha{width: 50%;}.imagen-logo{margin-top: 15%; width: 30%; margin-left: calc((100% - 30%)/2);}.link-pagina{margin-top: 2%; font-family: "Open Sans", sans-serif; font-size: 15px; text-align: center; cursor: pointer; color: #82AFEC;}.link-pagina a{text-decoration: none; color: #82AFEC;}.datos-cliente{font-family: "Open Sans", sans-serif; font-size: 14px;}.parte-tablas{width: 90%; margin-left: 5%; margin-top: 5%;}#customers{font-family: "Open Sans", sans-serif; font-size: 12px; border-collapse: collapse; width: 100%;}#customers td{padding: 6px;}#customers th{border: 2px solid #fff; padding: 6px;}#customers tr:nth-child(even){background-color: #f2f2f2;}#customers tr:hover{background-color: #ddd;}#customers th{padding-top: 12px; padding-bottom: 12px; text-align: left; background: #82AFEC !important; color: white;}.parte-abajo{display: flex;}.parte-notas{width: 45%; margin-left: 5%; margin-top: 3%;}.nota{font-family: "Open Sans", sans-serif; font-size: 13px;}.parte-precio{margin-top: 3%; margin-right: 5%; width: 45%; text-align: right;}@media print{body{-webkit-print-color-adjust: exact;}}</style></html>';

   fs.writeFile( timestamp+'.html', html, function (err) {
     if (err) throw err;
     console.log('Saved!');
     var docto = fs.readFileSync('./'+timestamp+'.html', 'utf8');
     var options = {format:'Tabloid'}//,  "orientation": "landscape"};
     pdf.create(docto,options).toFile('./data/'+timestamp+'.pdf', function(err, dat) {
       fs.unlinkSync(timestamp+'.html');
       if (err) {
         res.send({error:'No se pudo generar el documento'});
       }
       res.send({docto:timestamp+'.pdf'});
     });
   });

 })

 app.listen(3950, () => console.log('escuchando puerto 3950!'));
