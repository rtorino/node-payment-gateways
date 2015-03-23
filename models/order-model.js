'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
	price: {
		type: Number,
		required: true
	},

	currency: {
		type: String,
		required: true
	},

	customer: {
		type: String,
		required: true
	},

	createdAt: {
		type: Date,
		default: Date.now
	},

	updatedAt: {
		type: Date,
		default: Date.now
	},

	deletedAt: Date
});

module.exports = mongoose.model('Order', orderSchema);
