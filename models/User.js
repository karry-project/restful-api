const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('./../config/keys');

const UserSchema = new mongoose.Schema({
	firstname: {
		type: String,
		minlength: 1,
		trim: true,
		required: true
	},
	lastname: {
		type: String,
		minlength: 1,
		trim: true,
		required: true
	},
	description: {
		type: String,
		default: "Vous n'avez pas encore de description",
		trim: true
	},
	phone: {
		type: String,
		required: true
	},
	email: {
		type: String,
		minlength: 1,
		trim: true,
		required: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		minlength: 6
	},
	profilePicture: {
		type: String,
		required: true,
		default: function () {
			let id = Math.floor(Math.random() * 6) + 1;
			return `${keys.app.baseUrl}/uploads/default_${id}.png`;
		}
	},
	savedResearchs: [{
		destinationCity: {
			type: String
		},
		arrivalCity: {
			type: String
		},
	}],
	createdTripsCount: {
		required: false,
		type: Number,
		default: 0
	},
	joinedTripsCount: {
		required: false,
		type: Number,
		default: 0
	},
	reviews: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Review'
	}],
	firebaseId: {
		type: String,
		required: false
	},
	ratings: {
		type: String,
		required: false,
		default: null
	},
	tokens: {
		type: [{
			access: {
				type: String,
				required: true
			},
			token: {
				type: String,
				required: true
			}
		}]
	}
}, {
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		}
	});

UserSchema.virtual('fullname').get(function () {
	return this.firstname + ' ' + this.lastname;
});

UserSchema.virtual('tripList', {
	ref: 'Trip',
	localField: '_id',
	foreignField: 'owner'
});

UserSchema.virtual('requestList', {
	ref: 'Request',
	localField: '_id',
	foreignField: 'creator'
});

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.tokens

	return userObject;
};

UserSchema.methods.generateAuthToken = function () {
	const user = this;
	const access = 'auth';
	const token = jwt
		.sign({
			_id: user._id.toHexString(),
			access
		},
			keys.app.jwt.secret
		)
		.toString();
	user.tokens.push({ access, token });
	return user.save().then(() => token);
};

UserSchema.methods.removeToken = function (token) {
	const user = this;
	return user.updateOne({
		$pull: {
			tokens: { token }
		}
	});
};


UserSchema.methods.saveSearch = function (destinationCity, arrivalCity) {
	const user = this;
	return user.updateOne({
		$push: {
			savedResearchs: { destinationCity, arrivalCity }
		}
	});
};

UserSchema.statics.findByEmail = function (email) {
	const User = this;
	return User.findOne({
		email: email
	});
};

UserSchema.statics.findByToken = function (token) {
	const User = this;
	let decoded;
	try {
		decoded = jwt.verify(token, keys.app.jwt.secret);
	}
	catch (e) {
		return Promise.reject();
	}
	return User.findOne({
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

UserSchema.statics.findByCredentials = function (email, password) {
	const User = this;
	return User.findOne({ email }).then(user => {
		if (!user) {
			return Promise.reject();
		}
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					resolve(user);
				}
				else {
					reject();
				}
			});
		});
	});
};

UserSchema.pre('save', function (next) {
	const user = this;
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	}
	else {
		next();
	}
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
