const server = require('./server');
const keys = require('./config/keys');

const port = process.env.PORT || keys.app.defaultPort;

server.listen(port, () => {
	console.log(`Successfully lunched server on port ${port}`);
});
