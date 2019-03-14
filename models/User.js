const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./../config/config');

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
	phone: {
		type: String,
		minlength: 1,
		trim: true,
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
		required: true,
		minlength: 6
	},
	profilePicture: {
		type: String,
		required: true,
		default: function() {
			let id = Math.floor(Math.random() * 6) + 1;
			return `${config.URL}uploads/default_${id}.png`;
		}
	},
	tokens: [
		{
			access: {
				type: String,
				required: true
			},
			token: {
				type: String,
				required: true
			}
		}
	]
});

UserSchema.methods.toJSON = function() {
	const user = this;
	const { _id, firstname, lastname, phone, email, profilePicture } = user.toObject();
	return {
		_id,
		firstname,
		lastname,
		phone,
		email,
		profilePicture
	};
};

UserSchema.methods.generateAuthToken = function() {
	const user = this;
	const access = 'auth';
	const token = jwt
		.sign(
			{
				_id: user._id.toHexString(),
				access
			},
			config.JWT_SECRET
		)
		.toString();
	user.tokens.push({ access, token });
	return user.save().then(() => token);
};

UserSchema.methods.removeToken = function(token) {
	const user = this;
	return user.updateOne({
		$pull: {
			tokens: { token }
		}
	});
};

UserSchema.statics.findByToken = function(token) {
	const User = this;
	let decoded;
	try {
		decoded = jwt.verify(token, config.JWT_SECRET);
	} catch (e) {
		return Promise.reject();
	}
	return User.findOne({
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

UserSchema.statics.findByCredentials = function(email, password) {
	console.log('findByCredentials');
	const User = this;
	return User.findOne({ email }).then(user => {
		if (!user) {
			return Promise.reject();
		}
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					resolve(user);
				} else {
					reject();
				}
			});
		});
	});
};

UserSchema.pre('save', function(next) {
	const user = this;
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

const User = mongoose.model('User', UserSchema);
module.exports = { User };
