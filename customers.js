// customer.js

'use strict';

class CustomerController {

    constructor() {
        this.customers = [
            {id: 1, sku: 'sku12', name: 'Jean'},
            {id: 2, sku: 'sku13', name: 'Sarah'}
        ];
    }

    findCustomerById(req) {
        let found = this.customers.filter((customer)=> {
            return customer.id === parseInt(req.params.id, 10);
        });
        if (found && found.length > 0) {
            return found;
        }
        return null;
    }

    get(req, res, next) {
        res.send(200, this.customers);
        return next();
    }

    getById(req, res, next) {
        let found = this.findCustomerById(req);
        if (found) {
            res.send(200, found);
        } else {
            res.send(404, "Customer not found.");
        }
        return next();
    }

}

module.exports = new CustomerController();
