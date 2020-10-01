const connection = require('../config')

module.exports.show = (req, res, next) => {
    res.setHeader('content-Type', 'application/jqon');
    res.status(404).send(JSON.stringify(
        {
            'result' :  'Not found',
            'data' : null
        }
    ));
};