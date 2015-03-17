'use strict';

var config = require('../config');
var env = process.NODE_ENV || 'development';
var gateways = require('../gateways');
var Order = require('../models/order-model');

/**
 * Determine gateway based on the following conditions
 *
 * - if credit card type is AMEX, then use Paypal.
 * - if currency is USD, EUR, or AUD, then use Paypal. Otherwise use Braintree.
 * - if currency is not USD and credit card is AMEX, return error message,
 *   that AMEX is possible to use only for USD
 */
function whichGateway(payload) {
	var cardType = payload.cardType.toUpperCase();
	var currency = payload.currency.toUpperCase();
	var paypalCurrencies = ['USD', 'EUR', 'AUD'];

	if (cardType === 'AMEX' && currency !== 'USD') {
		return new Error('AMEX is possible to be use only for USD');
	} else {
		if (cardType === 'AMEX' || paypalCurrencies.indexOf(currency) !== -1) {
			return gateways.paypal;
		} else {
			return gateways.braintree;
		}
	}
}

module.exports = {
	process: function (request, reply) {

		var payload = request.payload;
		var gateway = whichGateway(payload);

		// set gateway for testing purposes
		this.gateway = gateway;

		gateway.createCreditCard(payload)
			.then(function(card) {
				gateway.createPayment(card, payload)
					.then(function(resp) {
						var orderInfo = {
							price: payload.orderAmount,
							currency: payload.currency,
							customer: payload.customerFullname
						};
						// save response here
						console.log(JSON.stringify(resp));
						// save order
						Order.create(orderInfo, function(err, order) {
							if (err) {
								throw err;
							}

							var baseUrl = request.server.info.uri;
							var path = request.path;

							return reply().created(baseUrl + path + '/' + order._id);
						});
					})
					.catch(function(err) {
						throw err;
					});
			})
			.catch(function(err) {
				throw err;
			});
	},

	getAll: function(request, reply) {
		Order.find(null, 'price currency customer', null, function (err, orders) {
			if (err) {
				return reply(err);
			} else {
				return reply(orders);
			}
		});
	}
};
