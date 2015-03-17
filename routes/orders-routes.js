'use strict';

var Joi = require('joi');
var orderCtrl = require('../controllers/order-controller.js');

module.exports = [
	{
		method: 'POST',

		path: '/orders',

		config: {
			auth: false,
			description: 'Add order instance and persist to data source',
			notes: 'Returns the location of the created order in the response headers',
			tags: ['api', 'orders', 'create'],
			validate: {
				payload: {
					// order section
					orderAmount: Joi.string()
						.description('Price (amount)')
						.required(),

					currency: Joi.string()
						.description('Currency (USD, EUR, THB, HKD, SGD, AUD)')
						.required(),

					customerFullname: Joi.string()
						.description('Customer Full name')
						.required(),

					// payment section
					cardHolderFirstname: Joi.string()
						.description('Credit card holder first name')
						.required(),

					cardHolderLastname: Joi.string()
						.description('Credit card holder last name')
						.required(),

					cardType: Joi.string()
						.description('Credit card type')
						.required(),

					cardNumber: Joi.string()
						.description('Credit card number')
						.required(),

					cardExpMonth: Joi.string()
						.description('Credit card expiration month')
						.required(),

					cardExpYear: Joi.string()
						.description('Credit card expiration year')
						.required(),

					cardCcv2: Joi.string()
						.description('Credit card CCV')
				}
			},
			handler: orderCtrl.process.bind(orderCtrl)
		}
	},

	{
		method: 'GET',

		path: '/orders',

		config: {
			auth: false,
			description: 'Get all orders',
			notes: 'Returns the array of orders',
			tags: ['api', 'orders', 'find'],

			handler: orderCtrl.getAll.bind(orderCtrl)
		}
	}
];
