const server = require('./server');
const config = require('./config/config');

server.listen(config.PORT, () => {
	console.log(`Successfully lunched server on port ${config.PORT}`);
});

