module.exports = {
	ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 3000,
	URL: process.env.BASE_URL || 'https://karry-dev.herokuapp.com/',
	MONGODB_URI: process.env.MONGODB_URI || 'mongodb://karry-admin:karryproject2019@ds125422.mlab.com:25422/karry',
	JWT_SECRET: process.env.JWT_SECRET || 'secret',
	ADMIN_TOKEN: 'hmmmmmmchiwawa',
	SEND_GRID_API_KEY: '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'
};
