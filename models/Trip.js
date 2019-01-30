const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
		minlength: 15,
		trim: true
	},
	destinationCity: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	destinationCountry: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	departureCity: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	departureCountry: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	carryWeight: {
		type: Number,
		required: true
	},
	carryMaxAmount: {
		type: Number,
		required: true
	},
	carryTaxe: {
		type: Number,
		required: true
	},
	creator: {
		type: String,
		required: true
	}
});

const Trip = mongoose.model('Trip', TripSchema);
module.exports = { Trip };
