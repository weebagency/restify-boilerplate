var restify = require('restify'),
    products = require('./products'),
    customers = require('./customers'),
    port = process.env.PORT || 3000;

// Create server
// -------------

var server = restify.createServer({
    name : 'Simple Restify Server'
});

// Middlewares
// -----------

server.use(function(req, res, next){
    console.log( req.method + ' ' + req.url );
    return next();
});

server.use(restify.bodyParser());

// Routes
// ------

server.get('api/products', products.get);
server.get('api/products/:id', products.getById);
server.post('api/products', products.post);
server.put('api/products/:id', products.put);
server.del('api/products/:id', products.del);

server.get('api/customers', customers.get.bind(customers));
server.get('api/customers/:id', customers.getById.bind(customers));

// Finishing
// ---------

server.on('uncaughtException', function (req, res, route, err) {
    console.log('uncaughtException', err.stack);
});

server.listen(port, function(){
    //console.log( 'API running at ' + port );
});
