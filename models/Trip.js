const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: false,
      minlength: 15,
      trim: true
    },
    destinationCity: {
      type: String,
      required: true,
      minlength: 1,
      lowercase: true,
      trim: true
    },
    destinationCountry: {
      type: String,
      required: false,
      minlength: 1,
      lowercase: true,
      trim: true
    },
    departureCity: {
      type: String,
      required: true,
      minlength: 1,
      lowercase: true,
      trim: true
    },
    departureCountry: {
      type: String,
      required: false,
      minlength: 1,
      lowercase: true,
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
    carryVolume: {
      type: Number,
      required: true
    },
    carryTaxe: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['waiting', 'running', 'done'],
      default: 'waiting'
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    joinList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

TripSchema.virtual('requestList', {
  ref: 'Request',
  localField: '_id',
  foreignField: 'tripId'
});

TripSchema.methods.toJSON = function() {
  const trip = this;
  const tripObject = trip.toObject();
  return tripObject;
};

const Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip;
