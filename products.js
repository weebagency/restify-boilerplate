// products.js

function ProductController() {

    var self = this;

    this.store = [
        {id: 1, name: "toto"},
        {id: 2, name: "tata"}
    ];

    var findProductById = function(req) {
        var found = self.store.filter(function(p){
            return p.id === parseInt(req.params.id, 10);
        });
        if (found && found.length > 0) {
            return found[0];
        }
        return null;
    };

    this.get = function(req, res, next) {
        res.send(200, self.store);
        return next();
    };

    this.getById = function(req, res, next) {
        var found = findProductById(req);
        if (found) {
            res.send(200, found);
        } else {
            res.send(404, "Product not found.");
        }
        return next();
    };

    this.post = function(req, res, next) {
        if (!req.body.hasOwnProperty('id')
            || !req.body.hasOwnProperty('name')) {
            res.send(500);
        } else {
            self.store.push({
                id: parseInt(req.body.id, 10),
                name: req.body.name
            });
            res.send(201);
        }
        return next();
    };

    this.put = function(req, res, next) {
        if (!req.body.hasOwnProperty('name')) {
            res.send(500);
            return next();
        }
        var found = findProductById(req);
        if (found) {
            found.name = req.body.name;
            res.send(200, found);
        } else {
            res.send(404, "Product not found.");
        }
        return next();
    };

    this.del = function(req, res, next) {
        self.store = self.store.filter(function(p){
            return p.id !== parseInt(req.params.id, 10);
        });
        res.send(200);
        return next();
    };
};

module.exports = new ProductController();
