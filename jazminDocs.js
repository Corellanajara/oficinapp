const express = require('express');
const app = express();

app.use(express.static('data'));

app.get('/', (req, res) => {
    res.send('Servidor de archivos! Jazmin ');
});

app.listen(3950, () => console.log('escuchando puerto 3950!'));
