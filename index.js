const express = require('express');
const hbs = require('express-handlebars');

const app = express();

//definir la carpeta publica
app.use(express.static('public'));

//para registrar el motor de render handlebars
app.engine('handlebars', hbs());

//para setear el motor de render a utilizar
app.set('view engine', 'handlebars');

//importar módulo bodyParser
var bodyParser = require('body-parser');
//configurar módulo body-parser
app.use(bodyParser.json());         //to suport JSON-encoded bodies
app.use(bodyParser.urlencoded({     //to suport URL-encoded bodies
    extended:true
}));
//usar body-aprser
app.use(express.json());

//importar archivo personas
var personas = require('./personas.js');
console.log('personas: ', personas);

//definir ruta principal - root
app.get('/', function(request, response){
    var contexto = {
        lista_personas: personas,
        texto:'Mi texto de prueba'
    };
    response.render('home', contexto);
});


app.post('/agregar' , (req, res) => {
personas.push({
    nombre:req.body.nombre,
    edad:req.body.edad,
});
    res.send('ok, agregado')
});

//iniciar el servidor en el puerto especificado
app.listen(5500);