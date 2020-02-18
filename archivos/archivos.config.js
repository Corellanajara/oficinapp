const fs   = require('fs');
//Create new File
exports.routesConfig = function (app) {

  app.post('/api/archivos',(req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }
console.log(req.files);
    let archivo = req.files.file;
    console.log("req body",req.body);
    let path = process.cwd()+'/data/'+req.body.idEmpresa;+'/';
    fs.mkdir(path, { recursive: true }, (err,success) => {
      if (err) throw err;
      console.log(success);
      archivo.mv(path+"/"+req.body.name, function(err) {
        if (err)
          return res.status(500).send(err);
        console.log(path+"/"+archivo.name);
        res.send({message: "Archivo Subido Correctamente!"});
      });
    });

  });
  app.get('/api/archivos',(req, res) => {
    res.send("hola mundo");
  });
}

