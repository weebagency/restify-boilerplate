// customers_test.js

var chai = require('chai'),
    request = require('request'),
    server = require('../server'),
    controller = require('../customers');

describe('Testing CustomerController', function(){

    before(function(){
        controller.customers = [
            {id: 1, sku: 'sku12-test', name: 'Jean'},
            {id: 2, sku: 'sku13', name: 'Sarah'}
        ];
    });

    describe('Customers #getById - 200 OK', function(){
        it('Should return customer JSON - 200 OK', function(done){
            request('http://localhost:3000/api/customers/1',
            function(err, res, body){
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(body).to.equal(
                    JSON.stringify(
                        new Array(controller.customers[0])
                    )
                );
                done();
            });
        });
    });

    describe('Customers #getById - 404', function(){
        it('Should return 404', function(done){
            request('http://localhost:3000/api/customers/3',
            function(err, res, body){
                chai.expect(res.statusCode).to.equal(404);
            });
            done();
        });
    });

});
