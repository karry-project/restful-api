const cors = require('cors');

module.exports = app => {
    const corsOptions = {
        exposedHeaders: 'x-auth'
    };
    app.use(cors(corsOptions));
};
