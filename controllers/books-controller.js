const connection = require('../config');

module.exports = {

all: function(req, res) {
    connection.query('select * from books', (err, rows) => {
        if (!err) {
            res.setHeader('content-Type', 'application/json');
            res.status(200).send(JSON.stringify(
                {
                    'result' : 'success',
                    'data' : rows
                }
            ));
        } else {
            res.status(400).send(err);
        }
    });
},

create: function(req, res, next) {
    let response;
    const name = req.body.name;
    const isbn = req.body.isbn;
    if (
        typeof name !== 'undefined'
        && typeof isbn !== 'undefined'
    ) {
        connection.query('INSERT INTO boons (name, isbn) VALUES (?, ?)',
        [name, isbn],
        function(err, reqult) {
            handleSuccessOrErrorMessage(err, result, res);
        });
    } else {
        response = {
            'result' : 'error',
            'msg' : 'Please fill required details'
        };
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(response));
    }
},

get: function(req, res) {
    connection.query('SELECT * FROM books WHERE id = ? LIMIT 1', [req.params.id], (err, rows) => {
        res.setHeader('content-type', 'application/json');
        res.status(200).send(JSON.stringify(
            {
                'result' : 'success',
                'data' : rows[0]
            }
        ));
    } )
},

update: function(req, res) {
    let response;
    const name = req.body.name;
    const isbn = req.body.isbn;
    const id = req.params.id;
    if (
        typeof name !== 'undefined'
        && typeof isbn !== 'undefined'
    ) {
        connection.query('UPDATE books SET name =?, isbn = ? WHERE id = ?',
        [name, isbn, id],
        function(err, result) {
            handleSuccessOrErrorMessage(err, result, res);
        }
        );
    } else {
        response = {'result' : name, 'msg' : 'Please fill the required information'};
        res.setHeader('content-Type', 'application/json');
        res.send(200, JSON.stringify(response));
    }
},

destroy: function(req, res) {
    connection.query('DELETE FROM books WHERE id = ?', [req.params.id], function(err, result) {
        handleSuccessOrErrorMessage(err, result, res);
    } );
}


};

function handleSuccessOrErrorMessage(err, result, res) {
    if (!err) {
        if (result.affectedRows != 0) {
            response = {'result':'success'};
        } else {
            response = {'msg' : 'No result found'};
        }
        res.setHeader('Content-type', 'application/json');
        res.status(200).send(JSON.stringify(response));
    }else {
        res.status(400).send(err);
    }
}



