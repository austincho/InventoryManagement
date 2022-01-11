const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

require('dotenv').config({ path: '.env' });

chai.use(chaiHttp);
chai.should();

let insertedData = [];

describe('Testing Item API Endpoints', function () {
    step('should return an array of items in the inventory', function (done) {
        chai.request(app)
            .get('/api/item/')
            .end((_err, res) => {
                res.should.have.status(200);
                insertedData = res.body;
                res.body.should.be.an('array');
                done();
            });
    });

    step('should add an item to the inventory', function (done) {
        let testItem = {
            name: 'Tesla Cybertruck',
            description: 'Electric Truck',
            quantity: 1000,
            arrivalDate: new Date().toISOString().split('T')[0],
            departureDate: new Date().toISOString().split('T')[0],
            company: 'Tesla'
        }

        chai.request(app)
            .post('/api/item/add')
            .send(testItem)
            .end((_err, res) => {
                res.should.have.status(201);
                expect(res.body.name).to.equal(testItem.name);
                expect(res.body.description).to.equal(testItem.description);
                expect(res.body.quantity).to.equal(testItem.quantity);
                expect(res.body.arrivalDate.split('T')[0]).to.equal(testItem.arrivalDate);
                expect(res.body.departureDate.split('T')[0]).to.equal(testItem.departureDate);
                testItem = res.body;
                done();
            });

    });

    step('should fail to add an item to the inventory', function (done) {
        chai.request(app)
            .post('/api/item/add')
            .send({})
            .end((_err, res) => {
                res.should.have.status(400);
                done();
            });

    });

    step('should delete an item in the inventory', function (done) {
        chai.request(app)
            .delete(`/api/item/delete/${insertedData[0]._id}`)
            .end((_err, res) => {
                res.should.have.status(200);
                expect(res.body.deleted).to.equal(true);
                done();
            });
    });

    step('should fail to delete a non-existent item in the inventory', function (done) {
        chai.request(app)
            .delete('/api/item/delete/fakeid')
            .end((_err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    step('should update an item using correct data types in the inventory', function (done) {
        let itemToUpdate = insertedData[1];
        const oldQuantity = itemToUpdate['quantity'];
        itemToUpdate['quantity'] = oldQuantity - 100;
        chai.request(app)
            .put('/api/item/update')
            .send(itemToUpdate)
            .end((_err, res) => {
                res.should.have.status(200);
                expect(res.body.updated).to.equal(true);
                expect(res.body.updatedItem.quantity).to.equal(oldQuantity - 100);
                done();
            });
    });

    step('should fail to update an item due to using incorrect data types', function (done) {
        let itemToUpdate = insertedData[1];
        itemToUpdate['quantity'] = 'NotANumber';
        chai.request(app)
            .put('/api/item/update')
            .send(itemToUpdate)
            .end((_err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    step('should successfully generate csv of all items in the inventory', function (done) {
        chai.request(app)
            .get('/api/item/csv')
            .end((_err, res) => {
                res.should.have.status(200);
                expect(res.header['content-type']).to.equal('text/csv; charset=utf-8');
                expect(res.header['content-disposition']).to.equal('attachment; filename="inventory.csv"');
                done();
            });
    });
});