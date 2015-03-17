'use strict';

var braintree = require('braintree');
var Q = require('q');

var config = require('../config');
var env = process.NODE_ENV || 'development';

module.exports = {
	name: 'braintree',

	init: function() {
		var braintreeCfg = config[env].braintree;

		var gateway = braintree.connect({
			environment: braintree.Environment.Sandbox,
			merchantId: braintreeCfg.merchantId,
			publicKey: braintreeCfg.publicKey,
			privateKey: braintreeCfg.privateKey
		});

		return gateway;
	},

	createCustomer: function(gateway, payload) {
		var deferred = Q.defer();

		gateway.customer.create({
			firstName: payload.cardHolderFirstname,
			lastName: payload.cardholderLastName,
			creditCard: {
				number: payload.cardNumber,
				expirationDate: payload.cardExpMonth + '/' + payload.cardExpMonth
			}
		}, function (err, result) {
			if (err) {
				deferred.reject(err);
			} else {
				console.log(result);
				deferred.resolve(result.customer.creditCards[0]);
			}
		});

		return deferred.promise;
	},

	createCreditCard: function(payload) {
		var gateway = this.init();

		return this.createCustomer(gateway, payload);
	},

	createPayment: function(card, payload) {
		var deferred = Q.defer();
		var gateway = this.init();

		gateway.transaction.sale({
			amount: payload.orderAmount,
			creditCard: {
				number: payload.cardNumber,
				expirationDate: payload.cardExpMonth + '/' + payload.cardExpYear
			}
		}, function(err, resp) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(resp);
			}
		});

		return deferred.promise;
	}
};
