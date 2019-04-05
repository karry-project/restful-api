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
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	joinList: [
		{
			type: mongoose.Schema.Types.ObjectId,
		}
	]
}, {
		toObject: {
			versionKey: false,
			virtuals: true
		},
		toJSON: {
			versionKey: false,
			virtuals: true
		}
	});

TripSchema.virtual('requestList', {
	ref: 'Request',
	localField: '_id',
	foreignField: 'tripId'
})

TripSchema.methods.toJSON = function () {
	const trip = this
	const tripObject = trip.toObject()

	delete tripObject._id

	return tripObject;
};

const Trip = mongoose.model('Trip', TripSchema);
module.exports = { Trip };
