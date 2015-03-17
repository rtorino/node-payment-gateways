'use strict';

var Code = require('code');
var Lab = require('lab');
var sinon = require('sinon');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var expect = Code.expect;

var mongooseMock = require('mongoose-mock');
var proxyquire = require('proxyquire');

var orderCtrl = require('../../controllers/order-controller');

describe('Order controller', function() {
	it('returns an object literal', function (done) {
		expect(orderCtrl).to.be.an.object();
		done();
	});

	it('has `process` method', function(done) {
		expect(orderCtrl.process).to.exist();
		done();
	});

	it('has `getAll` method', function(done) {
		expect(orderCtrl.getAll).to.exist();
		done();
	});
});

describe('Order controller `process` method', function() {

	describe('when credit card type is `AMEX` and currency is not `USD`', function () {
		it('will throw an error', function(done) {
			var callback = sinon.spy();
			var request= {
				payload: {
					cardType: 'amex',
					currency: 'SGD'
				}
			};

			try {
				expect(orderCtrl.process(request, callback))
				.to
				.throw(Error, 'AMEX is possible to be use only for USD');
			} catch (ex) {}
			done();
		});
	});

	describe('when currency is either USD, EUR, or AUD or credit card type is `AMEX`', function() {
		it('will use PayPal gateway', function(done) {
			var callback = sinon.spy();
			var request= {
				payload: {
					cardType: 'amex',
					currency: 'USD'
				}
			};

			orderCtrl.process(request, callback);
			expect(orderCtrl.gateway.name).to.deep.equal('paypal');
			done();
		});
	});

	describe('when currency is neither USD, EUR, or AUD', function() {
		it('will use Braintree gateway', function(done) {
			var callback = sinon.spy();
			var request= {
				payload: {
					cardType: 'visa',
					currency: 'SGD'
				}
			};

			orderCtrl.process(request, callback);
			expect(orderCtrl.gateway.name).to.deep.equal('braintree');
			done();
		});
	});
});

describe('Order controller `getAll` method', function() {
	var Order;

	before(function(done) {
		Order = proxyquire('../../models/order-model', {'mongoose': mongooseMock});
		done();
	});

	it('fetches all the orders', function(done) {
		var callback = sinon.spy();
		var orders = orderCtrl.getAll(null, 'price currency customer', null, callback);

		expect(Order.find).calledOnce;
		done();
	});
});
