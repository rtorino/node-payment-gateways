'use strict';

var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

var Order = require('../../models/order-model');

describe('Order model', function() {
	it('has a model name `Order`', function(done) {
		expect(Order.modelName).to.deep.equal('Order');
		done();
	});

	it('has a schema', function(done) {
		expect(Order.schema).to.exist();
		done();
	});
});

describe('Order model schema', function() {
	it('has paths', function(done) {
		expect(Order.schema.paths).to.exist();
		done();
	});
});

describe('Order model schema paths', function() {
	var paths = Order.schema.paths;

	it('has a price property', function(done) {
		expect(paths.price).to.exists();
		done();
	});

	it('has a currency property', function(done) {
		expect(paths.currency).to.exists();
		done();
	});

	it('has a customer property', function(done) {
		expect(paths.currency).to.exists();
		done();
	});

	it('has a createdAt property', function(done) {
		expect(paths.createdAt).to.exists();
		done();
	});

	it('has a updatedAt property', function(done) {
		expect(paths.updatedAt).to.exists();
		done();
	});

	it('has a deletedAt property', function(done) {
		expect(paths.deletedAt).to.exists();
		done();
	});
});
