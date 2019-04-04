module.exports = {
	ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 3000,
	URL: process.env.BASE_URL || 'https://karry-dev.herokuapp.com/',
	MONGODB_URI: process.env.MONGODB_URI || 'mongodb://karry:karryproject2019@ds213615.mlab.com:13615/karry_api',
	JWT_SECRET: process.env.JWT_SECRET || 'secret',
	ADMIN_TOKEN: 'hmmmmmmchiwawa',
	SEND_GRID_API_KEY: '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',
	FIREBASE_ADMIN_KEY: 'firebase-adminsdk-85efj@karry-app-f106e.iam.gserviceaccount.com'
};
