'use strict';

var paypal = require('paypal-rest-sdk');
var Q = require('Q');

module.exports = {
	name: 'paypal',

	init: function(config) {
		var paypalCfg = config.paypal;

		paypal.configure({
				mode: 'sandbox',
				client_id: paypalCfg.clientId,
				client_secret: paypalCfg.clientSecret
		});
	},

	createCreditCard: function(payload) {
		var cardInfo = {
			type: payload.cardType,
			number: payload.cardNumber,
			cvv2: payload.cardCcv2 || '123',
			expire_month: payload.cardExpMonth,
			expire_year: payload.cardExpYear
		};

		var deferred = Q.defer();

		paypal.credit_card.create(cardInfo, function (err, card) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(card);
			}
		});

		return deferred.promise;
	},

	createPayment: function(card, payload) {
		var payment = {
			intent: 'sale',
			payer: {
				payment_method: 'credit_card',
				funding_instruments: [{
					credit_card_token: {
						credit_card_id: card.id
					}
				}]
			},
			transactions: [{
				amount: {
						total: payload.orderAmount,
						currency: payload.currency || 'USD'
				},
				description: 'This is the payment description.'
			}]
		};

		var deferred = Q.defer();

		paypal.payment.create(payment, {}, function(err, resp) {
			if (err) {
				deferred.resolve(err);
			} else {
				deferred.resolve(resp);
			}
		});

		return deferred.promise;
	}
};
